import axios from "axios"
import { findIndex } from "lodash"

const getInitialState = () => {
  return {
    photos: {
      all: [],
      loaded: false,
      error: null,
      uploadSpec: {},
    },
    screenshots: {
      all: [],
      loaded: false,
      error: null,
      uploadSpec: {},
    },
    videos: {
      all: [],
      loaded: false,
      error: null,
      uploadSpec: {},
    },
    pdfs: {
      all: [],
      loaded: false,
      error: null,
      uploadSpec: {},
    },
  }
}

const state = getInitialState()

const mutations = {
  clear(state) {
    Object.assign(state, getInitialState())
  },
  set(state, payload) {
    state[payload.type].all.push(...payload.records)
    state[payload.type].loaded = true
    state[payload.type].error = null
  },
  add(state, payload) {
    state[payload.type].all.unshift(payload.file)
  },
  replace(state, payload) {
    const index = findIndex(state[payload.type].all, { id: payload.id })
    state[payload.type].all.splice(index, 1, payload.file)
  },
  remove(state, payload) {
    const index = findIndex(state[payload.type].all, { id: payload.id })
    state[payload.type].all.splice(index, 1)
  },
  setError(state, payload) {
    state[payload.type].error = payload.error
  },
  setUploadSpec(state, payload) {
    state[payload.type].uploadSpec = payload.spec
  },
  addPhotoTag(state, payload) {
    const photoIndex = findIndex(state.photos.all, { id: payload.photoId })
    state.photos.all[photoIndex].tags.unshift(payload.record)
  },
  updatePhotoTag(state, payload) {
    const photoIndex = findIndex(state.photos.all, { id: payload.photoId })
    const tagIndex = findIndex(state.photos.all[photoIndex].tags, { id: payload.tagId })

    Object.assign(state.photos.all[photoIndex].tags[tagIndex], payload.record)
  },
  removePhotoTag(state, payload) {
    const photoIndex = findIndex(state.photos.all, { id: payload.photoId })
    const tagIndex = findIndex(state.photos.all[photoIndex].tags, { id: payload.tagId })

    state.photos.all[photoIndex].tags.splice(tagIndex, 1)
  },
}

const actions = {
  fetch({ rootState, commit }, payload) {
    const fetch = (page) => {
      axios.get(`${rootState.resource.plural}/${rootState.resource.id}/${payload.type}?page=${page}`)
        .then(response => {
          commit("set", { type: payload.type, records: response.data.records })

          if (response.data.pagination.current < response.data.pagination.pages) {
            fetch(page + 1)
          }
        })
        .catch(error => { commit("setError", { type: payload.type, error: error }) })
    }

    return fetch(1)
  },
  fetchUploadSpec({ rootState, commit }, payload) {
    return axios.get(`${rootState.resource.plural}/${rootState.resource.id}/${payload.type}/upload_spec`)
      .then(response => { commit("setUploadSpec", { type: payload.type, spec: response.data }) })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
