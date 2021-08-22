import Vue from "vue"
import { findIndex } from "lodash"
import Api from "@/api"

const getInitialState = () => {
  return {
    all: [],
    loaded: false,
    error: null,
  }
}

const state = getInitialState()

const mutations = {
  clear(state) {
    Object.assign(state, getInitialState())
  },
  set(state, records) {
    state.all = records
    state.loaded = true
    state.error = null
  },
  add(state, record) {
    state.all.unshift(record)
  },
  replace(state, payload) {
    const index = findIndex(state.all, { id: payload.id })
    state.all.splice(index, 1, payload.record)
  },
  remove(state, id) {
    const index = findIndex(state.all, { id: id })
    state.all.splice(index, 1)
  },
  setError(state, error) {
    state.error = error
  },
}

const actions = {
  fetch({ rootState, commit }, payload) {
    return Api(rootState.resource.plural, "notes").fetch()
      .then(records => { commit("set", records) })
      .catch(error => { commit("setError", error) })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
