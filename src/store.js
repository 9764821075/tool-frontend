import Vue from "vue"
import Vuex from "vuex"

import uuid from "@/lib/uuid"

Vue.use(Vuex)

import notesStore from "@/stores/notes_store"
import mediaStore from "@/stores/media_store"
import activityStore from "@/stores/activity_store"
import personStore from "@/stores/person_store"
import organizationStore from "@/stores/organization_store"
import sourceStore from "@/stores/source_store"

export default new Vuex.Store({
  modules: {
    notes: notesStore,
    media: mediaStore,
    activity: activityStore,
    person: personStore,
    organization: organizationStore,
    source: sourceStore,
  },

  state: {
    resource: {
      id: null,
      singular: null,
      plural: null,
    },
  },

  mutations: {
    setResource(state, data) {
      state.resource.id = data.id
      state.resource.singular = data.singular
      state.resource.plural = data.plural
    },
  },

  actions: {
    create({ commit }, { namespace, api, record }) {
      record.id = uuid()
      commit(`${namespace}/add`, record)

      return api
        .create(record)
        .then(persistedRecord =>
          commit(`${namespace}/replace`, {
            id: record.id,
            record: persistedRecord
          })
        )
        .catch(() => commit(`${namespace}/remove`, record.id))
    },
    update({ commit }, { namespace, api, record, backup }) {
      commit(`${namespace}/replace`, { id: record.id, record: record })

      return api
        .update(record)
        .then(persistedRecord =>
          commit(`${namespace}/replace`, {
            id: persistedRecord.id,
            record: persistedRecord
          })
        )
        .catch(() =>
          commit(`${namespace}/replace`, { id: backup.id, record: backup })
        )
    },
    remove({ commit }, { namespace, api, id, backup }) {
      commit(`${namespace}/remove`, id)

      return api
        .delete(id)
        .catch(() => commit(`${namespace}/add`, backup))
    },
  },
})
