import Vue from "vue"
import Api from "@/api"

import association from "./factories/association_store_factory"
import primaryPhoto from "./factories/primary_photo_store_factory"

const modules = {
  logo: primaryPhoto("organizations", "logo"),
  profiles: association("organization", "profiles"),
  addresses: association("organization", "addresses"),
  members: association("organization", "members"),
  activities: association("organization", "activities"),
}

const getInitialState = () => {
  return {
    organization: {
      data: {},
      loaded: false,
      error: null,
    },
  }
}

const state = getInitialState()

const mutations = {
  clear(state) {
    Object.assign(state, getInitialState())
  },
  setOrganization(state, record) {
    state.organization.data = record
    state.organization.loaded = true
    state.organization.error = null
  },
  updateOrganization(state, attributes) {
    state.organization.data = Object.assign({}, state.organization.data, attributes)
  },
  setError(state, error) {
    state.organization.error = error
  },
}

const actions = {
  clear({ commit }) {
    commit("clear")
    for (let module in modules) {
      commit(`${module}/clear`)
    }
  },
  fetch({ rootState, commit }) {
    return Api(rootState.resource.plural, "self").fetch()
      .then(record => { commit("setOrganization", record) })
      .catch(error => { commit("setError", error) })
  },
  update({ rootState, state, commit }, data) {
    const backup = { ...state.organization.data }

    commit("updateOrganization", data)

    Api(rootState.resource.plural, "self")
      .update(rootState.resource.id, data)
      .then(record => commit("setOrganization", record))
      .catch(() => commit("setOrganization", backup))
  },
}

export default {
  namespaced: true,
  modules,
  state,
  mutations,
  actions,
}
