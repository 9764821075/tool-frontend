<template>
  <div v-if="active" class="vbox-overlay vbox-open" :class="{ active: active }">
    <div class="vbox-container">
      <div
        v-if="file"
        class="vbox-content"
        :style="{ height: isPdf ? '100%' : 'auto' }">

        <div v-show="imageIsLoading" style="position: absolute; left: 49%; top: 7rem;">
          <div class="spinner"></div>
        </div>

        <video
          v-if="isVideo"
          controls
          :src="file.src"
          :width="file.width"
          :height="file.height" />

        <object
          v-if="isPdf"
          :data="file.src"
          type="application/pdf"
          width="100%"
          height="100%" />

        <img
          v-if="isPhoto || isScreenshot"
          :src="file.src"
          @load="onLoad"
          class="vbox-image"
          :style="{ opacity: imageIsLoading ? '.1' : '1' }">

        <template v-if="isPhoto && tagging && imageLoaded">
          <PhotoTag
            v-if="showNewTag"
            :tag="newTag"
            :new-tag="true"
            :file="file"
            :image-rect="imageRect"
            @tag-canceled="newTagCanceled"
            @tag-saved="newTagSaved" />

          <PhotoTag
            v-for="tag in file.tags"
            :key="tag.id"
            :tag="tag"
            :file="file"
            :image-rect="imageRect" />
        </template>
      </div>
    </div>

    <div v-if="file" class="vbox-title">{{ file.description }}</div>

    <div v-show="gotoEnabled" class="vbox-num">
      <input
        v-model="gotoPageNumber"
        type="text"
        ref="goto"
        @keyup.enter="onGoto"
        @keyup.esc.stop="disableGoto"
        @keyup.left.stop
        @keyup.right.stop
        style="margin: 0 .3rem 0 .5rem; width: 50px;"
        maxlength="8">
      /{{ files.length }}
    </div>
    <div v-show="!gotoEnabled" class="vbox-num">
      <a @click.prevent="enableGoto">{{ index + 1 }}/{{ files.length }}</a>
    </div>

    <div v-if="tagging" @click="addNewTag" class="vbox-tag"><i class="fa fa-tag"></i></div>

    <div @click="hide" class="vbox-close">&times;</div>

    <a @click="next" class="vbox-next"><span>Next</span></a>
    <a @click="prev" class="vbox-prev"><span>Prev</span></a>
  </div>
</template>

<script>
  import Vue from "vue"
  import PhotoTag from "./PhotoTag.vue"

  export default {
    name: "Gallery",
    data() {
      return {
        active: false,
        files: [],
        index: 0,
        tagging: false,
        imageLoaded: false,
        imageIsLoading: false,
        imageRect: {},
        gotoPageNumber: null,
        gotoEnabled: false,
        showNewTag: false,
        newTag: {
          rect: {
            top: 100,
            left: 100,
            width: 100,
            height: 120,
          },
        },
      }
    },
    mounted() {
      this.$gallery.setDynamicContainer(this)
    },
    computed: {
      file() {
        return this.files[this.index]
      },
      isPdf() {
        return this.file.resource == "pdfs"
      },
      isPhoto() {
        return this.file.resource == "photos"
      },
      isScreenshot() {
        return this.file.resource == "screenshots"
      },
      isVideo() {
        return this.file.resource == "videos"
      },
    },
    methods: {
      onLoad(event) {
        this.setImageRect(event.target)
        this.imageLoaded = true
        this.imageIsLoading = false
      },
      show(files, index, options) {
        this.files = files
        this.active = true

        this.goto(index)
        this.tagging = !!(options && options.tagging)
      },
      hide() {
        this.active = false
        this.imageLoaded = false
        this.showNewTag = false
        this.files = []
        this.index = 0
      },
      next() {
        this.goto(this.index + 1)
      },
      prev() {
        this.goto(this.index - 1)
      },
      enableGoto() {
        this.gotoPageNumber = this.index + 1
        this.gotoEnabled = true

        Vue.nextTick(() => {
          this.$refs.goto.focus()
          this.$refs.goto.select()
        })
      },
      disableGoto() {
        this.gotoEnabled = false
      },
      onGoto() {
        const page = this.gotoPageNumber
        if (page < 1 || page > this.files.length) { return }
        this.goto(page - 1)
      },
      goto(index) {
        if (index == this.index) {
          this.gotoEnabled = false
          return
        }

        if (index < 0) {
          index = this.files.length - 1
        } else if (index >= this.files.length) {
          index = 0
        }

        this.index = index

        this.imageLoaded = false
        this.imageIsLoading = true
        this.showNewTag = false
        this.gotoEnabled = false
      },
      addNewTag() {
        this.showNewTag = true
      },
      newTagSaved() {
        this.showNewTag = false
      },
      newTagCanceled() {
        this.showNewTag = false
      },
      setImageRect(el) {
        const { top, right, bottom, left, width, height, x, y } = el.getBoundingClientRect()
        this.imageRect = { top, right, bottom, left, width, height, x, y }
      },
    },
    components: {
      PhotoTag,
    },
  }
</script>

<style lang="scss" scoped>
.vbox-image {
  pointer-events: none;
}
</style>
