import Vue from "vue"
import Api from "@/api"

const modules = {}

const getInitialState = () => {
  return {
    source: {
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
  setSource(state, record) {
    state.source.data = record
    state.source.loaded = true
    state.source.error = null
  },
  updateSource(state, attributes) {
    state.source.data = Object.assign({}, state.source.data, attributes)
  },
  setError(state, error) {
    state.source.error = error
  },
}

const actions = {
  clear({ state, commit }) {
    commit("clear")
  },
  fetch({ rootState, commit }) {
    return Api(rootState.resource.plural, "self").fetch()
      .then(record => { commit("setSource", record) })
      .catch(error => { commit("setError", error) })
  },
  update({ rootState, state, commit }, data) {
    const backup = { ...state.source.data }

    commit("updateSource", data)

    Api(rootState.resource.plural, "self")
      .update(rootState.resource.id, data)
      .then(record => commit("setSource", record))
      .catch(() => commit("setSource", backup))
  },
}

export default {
  namespaced: true,
  modules,
  state,
  mutations,
  actions,
}
