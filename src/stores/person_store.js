import Vue from "vue"
import Api from "@/api"

import association from "./factories/association_store_factory"
import primaryPhoto from "./factories/primary_photo_store_factory"

const modules = {
  primaryPhoto: primaryPhoto("people", "primary_photo"),
  profiles: association("person", "profiles"),
  addresses: association("person", "addresses"),
  activities: association("person", "activities"),
  organizations: association("person", "organizations"),
  relationships: association("person", "relationships"),
  workplaces: association("person", "workplaces"),
}

const getInitialState = () => {
  return {
    person: {
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
  setPerson(state, record) {
    state.person.data = record
    state.person.loaded = true
    state.person.error = null
  },
  updatePerson(state, attributes) {
    state.person.data = Object.assign({}, state.person.data, attributes)
  },
  setError(state, error) {
    state.person.error = error
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
      .then(record => { commit("setPerson", record) })
      .catch(error => { commit("setError", error) })
  },
  update({ rootState, state, commit }, data) {
    const backup = { ...state.person.data }

    commit("updatePerson", data)

    Api(rootState.resource.plural, "self")
      .update(rootState.resource.id, data)
      .then(record => commit("setPerson", record))
      .catch(() => commit("setPerson", backup))
  },
}

export default {
  namespaced: true,
  modules,
  state,
  mutations,
  actions,
}
