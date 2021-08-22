import Vue from "vue"
import axios from "axios"
import pluralize from "pluralize"
import store from "@/store"
import deserialize from "@/deserialize"

import uuid from "@/lib/uuid"
import dateHelper from "@/lib/date_helper"

const indexCrud = (resource) => {
  return {
    fetch() {
      return axios
        .get(resource)
        .then(response => response.data.map(record => deserialize(record, resource)))
    },
  }
}

const resourceCrud = (resource) => {
  return {
    fetch() {
      return axios
        .get(`${resource}/${store.state.resource.id}`)
        .then(response => deserialize(response.data, resource))
    },
    update(resourceId, data) {
      return axios
        .patch(`${resource}/${resourceId}`, data)
        .then(response => deserialize(response.data, resource))
    },
  }
}

const associationCrud = (resource, association) => {
  return {
    fetch() {
      return axios
        .get(`${resource}/${store.state.resource.id}/${association}`)
        .then(response => response.data.map(record => deserialize(record, resource, association)))
    },
    create(data) {
      return axios
        .post(`${resource}/${store.state.resource.id}/${association}`, data)
        .then(response => deserialize(response.data, resource, association))
    },
    update(data) {
      return axios
        .patch(`${resource}/${store.state.resource.id}/${association}/${data.id}`, data)
        .then(response => deserialize(response.data, resource, association))
    },
    delete(id) {
      return axios.delete(`${resource}/${store.state.resource.id}/${association}/${id}`)
    },
  }
}

const Api = {
  people: {
    index: indexCrud("people"),
    self: resourceCrud("people"),
    addresses: associationCrud("people", "addresses"),
    profiles: associationCrud("people", "profiles"),
    activities: associationCrud("people", "activities"),
    organizations: associationCrud("people", "organizations"),
    relationships: associationCrud("people", "relationships"),
    workplaces: associationCrud("people", "workplaces"),
    notes: associationCrud("people", "notes"),
  },

  activities: {
    index: indexCrud("activities"),
    self: resourceCrud("activities"),
    organizations: associationCrud("activities", "organizations"),
    participants: associationCrud("activities", "participants"),
    notes: associationCrud("activities", "notes"),
  },

  organizations: {
    index: indexCrud("organizations"),
    self: resourceCrud("organizations"),
    addresses: associationCrud("organizations", "addresses"),
    profiles: associationCrud("organizations", "profiles"),
    members: associationCrud("organizations", "members"),
    activities: associationCrud("organizations", "activities"),
    notes: associationCrud("organizations", "notes"),
  },

  sources: {
    index: indexCrud("sources"),
    self: resourceCrud("sources"),
  },

  photoTags: {
    add(params) {
      const tagId   = uuid()
      const photoId = params.photoId
      const person  = params.person
      const rect    = params.rect

      store.commit("media/addPhotoTag", {
        photoId: photoId,
        record: {
          id: tagId,
          photo_id: photoId,
          person: person,
          rect: rect,
        },
      })

      const data = {
        person: person,
        top:    rect.top,
        left:   rect.left,
        width:  rect.width,
        height: rect.height,
      }

      return axios.post(`photos/${photoId}/tag`, data)
        .then(response => {
          store.commit("media/updatePhotoTag", {
            tagId: tagId,
            photoId: photoId,
            record: response.data,
          })
        })
    },
    update(params) {
      const tagId   = params.tagId
      const photoId = params.photoId
      const person  = params.person
      const rect    = params.rect

      store.commit("media/updatePhotoTag", {
        tagId: tagId,
        photoId: photoId,
        record: {
          rect: rect,
          person: person,
        },
      })

      const data = {
        tag_id: tagId,
        person: person,
        top:    rect.top,
        left:   rect.left,
        width:  rect.width,
        height: rect.height,
      }

      return axios.post(`photos/${photoId}/tag`, data)
        .then(response => {
          store.commit("media/updatePhotoTag", {
            tagId: tagId,
            photoId: photoId,
            record: response.data,
          })
        })
    },
    delete(params) {
      const tagId   = params.tagId
      const photoId = params.photoId

      store.commit("media/removePhotoTag", {
        photoId: photoId,
        tagId: tagId,
      })

      return axios.delete(`photos/${photoId}/tag/${tagId}`)
    },
  },
}

const lookup = (resource, association) => {
  resource = pluralize.plural(resource)

  if (association) {
    return Api[resource][association]
  }
  return Api[resource]
}

Vue.prototype.$api = lookup

export default lookup
