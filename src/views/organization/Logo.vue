<template>
  <div class="logo media-button-container">
    <figure class="image is-square" :style="{ background: fileColor }">

      <!-- LOADING -->
      <i v-if="!missing" class="fa fa-refresh logo-icon"></i>

      <!-- MISSING -->
      <i v-if="missing" class="fa fa-times logo-icon"></i>

      <div class="media-button-group">
        <form ref="fileForm">
          <input
            @click="resetForm"
            @change="chooseFile"
            :accept="filetypes"
            :id="fileInputClass"
            type="file"
            class="file-upload-input">
        </form>

        <label :for="fileInputClass" class="media-button">
          <span class="fa-stack">
            <i class="fa fa-stack-2x fa-circle media-button-background"></i>
            <i class="fa fa-stack-1x fa-plus media-button-icon"></i>
          </span>
        </label>
      </div>

      <img
        v-if="loaded"
        :src="fileSrc"
        :key="fileSrc"
        loading="lazy"
        @click="openInGallery"
        class="logo-img"
        alt="">

    </figure>
  </div>
</template>

<script>
import axios from "axios"
import UploadMediaItem from "@/components/media/UploadMediaItem"

export default {
  name: "Logo",
  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      modalName: this.$vnode.tag,
      newLogo: null,
      filetypes: ".jpg, .png",
      fileInputClass: "add-logo",
    }
  },
  created() {
    this.$store.dispatch(`${this.$store.state.resource.singular}/logo/fetch`)
    this.$store.dispatch(`${this.$store.state.resource.singular}/logo/fetchUploadSpec`)
  },
  computed: {
    state() {
      return this.$store.state[this.$store.state.resource.singular].logo
    },
    loaded() {
      return this.state.loaded
    },
    missing() {
      return this.state.missing
    },
    file() {
      return this.state.data
    },
    uploadSpec() {
      return this.state.uploadSpec
    },
    fileSrc() {
      return this.file.preview_url
    },
    fileColor() {
      return this.file.color || "#eee"
    },
  },
  methods: {
    openInGallery() {
      this.$gallery.show([this.file], 0)
    },
    resetForm() {
      this.$refs.fileForm.reset()
    },
    chooseFile(event) {
      const files = event.target.files
      if (!files || !files[0]) { return }

      const backup = this.file
      this.uploading()

      UploadMediaItem({
        file: files[0],
        uploadSpec: this.uploadSpec,
      }).then(fileData => {
        const params = {
          file: fileData,
        }

        axios
          .post(`${this.$store.state.resource.plural}/${this.$store.state.resource.id}/logo`, params)
          .then(response => {
            this.replace(response.data)
          })
          .catch(() => {
            this.replace(backup)
          })
      })
    },
    uploading() {
      this.$store.commit(`${this.$store.state.resource.singular}/logo/uploading`)
    },
    replace(file) {
      this.$store.commit(`${this.$store.state.resource.singular}/logo/replace`, { file: file })
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  margin-bottom: 6rem;
}

.logo-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -.3rem;
  text-align: center;
  font-size: 4rem;
  color: rgba(255, 255, 255, .9);
}

.logo-img {
  cursor: pointer;
}
</style>
