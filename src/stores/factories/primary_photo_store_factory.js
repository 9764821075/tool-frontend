import axios from "axios"

export default (resource, association) => {
  const getInitialState = () => {
    return {
      data: {},
      loaded: false,
      missing: false,
      uploadSpec: {},
    }
  }

  const state = getInitialState()

  const mutations = {
    clear(state) {
      Object.assign(state, getInitialState())
    },
    set(state, record) {
      state.data = record
      state.loaded = true
    },
    uploading(state) {
      state.loaded = false
      state.missing = false
    },
    replace(state, payload) {
      state.data = payload.file
      state.loaded = true
      state.missing = false
    },
    setUploadSpec(state, payload) {
      state.uploadSpec = payload.spec
    },
    markAsMissing(state) {
      state.missing = true
    },
  }

  const actions = {
    fetch({ rootState, commit }) {
      return axios.get(`${resource}/${rootState.resource.id}/${association}`)
        .then(response => { commit("set", response.data) })
        .catch(error => { commit("markAsMissing") })
    },
    fetchUploadSpec({ rootState, commit }, payload) {
      return axios.get(`${resource}/${rootState.resource.id}/${association}/upload_spec`)
        .then(response => { commit("setUploadSpec", { spec: response.data }) })
    },
  }

  return {
    namespaced: true,
    state,
    mutations,
    actions,
  }
}
