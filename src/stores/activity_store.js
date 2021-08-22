import Vue from "vue"
import Api from "@/api"

import association from "./factories/association_store_factory"
import primaryPhoto from "./factories/primary_photo_store_factory"

const modules = {
  primaryPhoto: primaryPhoto("activities", "primary_photo"),
  organizations: association("activity", "organizations"),
  participants: association("activity", "participants"),
}

const getInitialState = () => {
  return {
    activity: {
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
  setActivity(state, record) {
    state.activity.data = record
    state.activity.loaded = true
    state.activity.error = null
  },
  updateActivity(state, attributes) {
    state.activity.data = Object.assign({}, state.activity.data, attributes)
  },
  setError(state, error) {
    state.activity.error = error
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
      .then(record => { commit("setActivity", record) })
      .catch(error => { commit("setError", error) })
  },
  update({ rootState, state, commit }, data) {
    const backup = { ...state.activity.data }

    commit("updateActivity", data)

    Api(rootState.resource.plural, "self")
      .update(rootState.resource.id, data)
      .then(record => commit("setActivity", record))
      .catch(() => commit("setActivity", backup))
  },
}

export default {
  namespaced: true,
  modules,
  state,
  mutations,
  actions,
}
