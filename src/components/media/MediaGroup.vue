<template>
  <div class="media-group">
    <MediaFormModal
      :modalName="modalName"
      @save="saveForm"
      @destroy="destroyItem" />

    <div class="media-group--headline">
      <form ref="fileForm">
        <input
          multiple
          @click="resetForm"
          @change="chooseFile"
          :accept="filetypes"
          :id="fileInputClass"
          type="file"
          class="file-upload-input">
      </form>

      <label :for="fileInputClass" class="inline-add-button" :class="{ deactivate: !!error }">
        <i class="inline-button-icon fa fa-fw fa-plus"></i>
      </label>

      <div class="media-group--headline-text">
        {{ count }} {{ counted(type, count) }}
      </div>
    </div>

    <div class="columns is-multiline is-mobile" style="padding: 0 0 2rem 37px;">
      <template v-if="loaded">
        <template v-if="files.length">
          <MediaItem
            v-for="(file, index) in files"
            :key="file.id"
            :index="index"
            :file="file"
            :type="type"
            :orientation="orientation"
            :enable-primary-photo-button="enablePrimaryPhotoButton"
            @show="showItem"
            @edit="editItem"
            @set-primary-photo="setPrimaryPhoto" />
        </template>

        <div v-else class="media-group--empty-state">
          No {{ type }}
        </div>
      </template>

      <div v-else-if="!loaded && !error" class="media-group--loading-state">
        <div class="spinner"></div>
      </div>

      <div v-else class="media-group--error-state">
        Error {{ error.response && error.response.status }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

import uuid from "@/lib/uuid"
import counted from "@/lib/counted"
import MediaItem from "./MediaItem.vue"
import MediaFormModal from "./MediaFormModal.vue"
import UploadMediaItem from "./UploadMediaItem"

export default {
  name: "MediaGroup",
  props: {
    filetypes: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    orientation: {
      type: String,
      required: true,
    },
    tagging: {
      type: Boolean,
      required: false,
    },
    enablePrimaryPhotoButton: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.$store.commit("media/clear")
    this.$store.dispatch("media/fetch", { type: this.type })
    this.$store.dispatch("media/fetchUploadSpec", { type: this.type })
  },
  computed: {
    loaded() {
      return this.$store.state.media[this.type].loaded
    },
    error() {
      return this.$store.state.media[this.type].error
    },
    files() {
      return this.$store.state.media[this.type].all
    },
    uploadSpec() {
      return this.$store.state.media[this.type].uploadSpec
    },
    count() {
      return this.files.length
    },
    modalName() {
      return `media-form-modal-${this.type}`
    },
    fileInputClass() {
      return `add-file-${this.type}`
    },
  },
  methods: {
    counted,
    showItem(index, item) {
      this.$gallery.show(this.files, index, { tagging: this.tagging })
    },
    add(file) {
      this.$store.commit("media/add", { type: this.type, file: file })
    },
    replace(id, file) {
      this.$store.commit("media/replace", { type: this.type, id: id, file: file })
    },
    remove(id) {
      this.$store.commit("media/remove", { type: this.type, id: id })
    },
    editItem(file) {
      this.$modal.show(this.modalName, {
        type: this.type,
        id: file.id,
        description: file.description,
        sources: file.sources,
      })
    },
    destroyItem(id) {
      this.remove(id)
      axios.delete(`${this.$store.state.resource.plural}/${this.$store.state.resource.id}/${this.type}/${id}`)
    },
    resetForm() {
      this.$refs.fileForm.reset()
    },
    chooseFile(event) {
      const files = event.target.files
      if (!files || !files[0]) { return }

      this.$modal.show(this.modalName, {
        type: this.type,
        files: files,
      })
    },
    saveForm(data) {
      data.id ? this.updateFile(data) : this.createFiles(data)
    },
    createFiles(data) {
      for (let i = 0; i < data.files.length; i++) {
        const file = { id: uuid() }
        this.add(file)

        UploadMediaItem({
          file: data.files[i],
          description: data.description,
          uploadSpec: this.uploadSpec,
        }).then(fileData => {
          const params = {
            file: fileData,
            description: data.description,
            sources: data.sources,
          }

          axios
            .post(`${this.$store.state.resource.plural}/${this.$store.state.resource.id}/${this.type}`, params)
            .then(response => {
              this.replace(file.id, response.data)
            })
            .catch(error => {
              this.remove(file.id)
            })
        })
      }
    },
    updateFile(data) {
      const params = {
        description: data.description,
        sources: data.sources,
      }

      axios
        .patch(`${this.$store.state.resource.plural}/${this.$store.state.resource.id}/${this.type}/${data.id}`, params)
        .then(response => { this.replace(response.data.id, response.data) })
    },
    setPrimaryPhoto(file) {
      this.$store.commit(`${this.$store.state.resource.singular}/primaryPhoto/set`, file)

      axios
        .put(`${this.$store.state.resource.plural}/${this.$store.state.resource.id}/primary_photo`, { photo_id: file.id })
        .then(response => {
          this.$store.commit(`${this.$store.state.resource.singular}/primaryPhoto/set`, response.data)
        })
    },
  },
  components: {
    MediaItem,
    MediaFormModal,
  },
}
</script>

<style lang="scss">
.media-group {
  display: block;
  padding-bottom: 60px;
  margin-left: -2.2rem;
}

.media-group:hover .inline-add-button > .fa,
.media-item-container:hover .media-button {
  opacity: 1;
}

.media-group--headline {
  border-bottom: 1px solid #e4e3e3;
  margin-bottom: 3rem;
}
.media-group--headline-text {
  padding-left: 3px;
  display: inline;
  background: #fff;
  padding-right: 20px;
  text-transform: uppercase;
  font-size: .7rem;
  letter-spacing: .1rem;
  color: #bbb;
}

.media-group--loading-state,
.media-group--empty-state,
.media-group--error-state {
  margin-left: 10px;
  color: #bbb;
  font-weight: 300;
}
.media-group--error-state {
  color: #ff3860;
}
</style>
