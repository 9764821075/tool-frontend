<template>
  <VueDraggableResizable
    class="photo-tag"
    :class="{ 'photo-tag-new': newTag }"
    :active.sync="active"
    :x="scaledRect.left"
    :y="scaledRect.top"
    :w="scaledRect.width"
    :h="scaledRect.height"
    :minw="15"
    :minh="15"
    :draggable="true"
    :resizable="true"
    @resizestop="onResizeStop"
    @dragstop="onDragStop">

    <p v-show="!active" class="photo-tag-label">
      {{ tag.person && tag.person.name }}
    </p>

    <PhotoTagForm
      v-show="active"
      :tag="tag"
      :new-tag="newTag"
      @save-tag="saveTag"
      @cancel-tag="cancelTag"
      @delete-tag="deleteTag" />
  </VueDraggableResizable>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable"
import PhotoTagForm from "./PhotoTagForm.vue"

export default {
  name: "PhotoTag",
  props: {
    tag: {
      type: Object,
      required: true,
    },
    file: {
      type: Object,
    },
    imageRect: {
      type: Object,
      required: true,
    },
    newTag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
      currentRect: {
        top: null,
        left: null,
        width: null,
        height: null,
      },
    }
  },
  mounted() {
    this.active = this.newTag
  },
  computed: {
    scaledRect() {
      const fullPhotoWidth  = this.file.width
      const fullPhotoHeight = this.file.height

      const currentPhotoWidth  = this.imageRect.width
      const currentPhotoHeight = this.imageRect.height

      const scrollTop = document.getElementsByClassName("vbox-container")[0].scrollTop

      const photoTopOffset  = this.imageRect.top + scrollTop
      const photoLeftOffset = this.imageRect.left

      const rect = this.tag.rect

      return {
        top:    photoTopOffset  + (rect.top  * (currentPhotoHeight / fullPhotoHeight)),
        left:   photoLeftOffset + (rect.left * (currentPhotoWidth  / fullPhotoWidth)),
        width:  rect.width      * (currentPhotoWidth  / fullPhotoWidth),
        height: rect.height     * (currentPhotoHeight / fullPhotoHeight),
      }
    },
  },
  methods: {
    rescaleRect(rect) {
      const fullPhotoWidth  = this.file.width
      const fullPhotoHeight = this.file.height

      const currentPhotoWidth  = this.imageRect.width
      const currentPhotoHeight = this.imageRect.height

      const scrollTop = document.getElementsByClassName("vbox-container")[0].scrollTop

      const photoTopOffset  = this.imageRect.top
      const photoLeftOffset = this.imageRect.left

      return {
        top:    Math.round((rect.top   - photoTopOffset)     / (currentPhotoWidth / fullPhotoWidth)),
        left:   Math.round((rect.left  - photoLeftOffset)    / (currentPhotoWidth / fullPhotoWidth)),
        width:  Math.round(rect.width  / (currentPhotoWidth  / fullPhotoWidth)),
        height: Math.round(rect.height / (currentPhotoHeight / fullPhotoHeight)),
      }
    },
    combineRecs(current, scaled) {
      const rect = {
        top:    current.top    === null ? scaled.top    : current.top,
        left:   current.left   === null ? scaled.left   : current.left,
        width:  current.width  === null ? scaled.width  : current.width,
        height: current.height === null ? scaled.height : current.height,
      }

      if (rect.top <= 0) { rect.top = 0 }
      if (rect.left <= 0) { rect.left = 0 }

      return rect
    },
    onResizeStop(left, top, width, height) {
      this.currentRect.left   = left
      this.currentRect.top    = top
      this.currentRect.width  = width
      this.currentRect.height = height
    },
    onDragStop(left, top) {
      this.currentRect.left = left
      this.currentRect.top  = top
    },
    saveTag(person) {
      const combinedRects = this.combineRecs(this.currentRect, this.scaledRect)
      const rescaledRect = this.rescaleRect(combinedRects)

      if (this.newTag) {
        this.$api("photoTags").add({
          photoId: this.file.id,
          person:  person,
          rect:    rescaledRect,
        })
      } else {
        this.$api("photoTags").update({
          tagId:   this.tag.id,
          photoId: this.file.id,
          person:  person,
          rect:    rescaledRect,
        })
      }

      this.active = false
      this.$emit('tag-saved')
    },
    cancelTag() {
      this.active = false
      this.$emit('tag-canceled')
    },
    deleteTag() {
      this.$api("photoTags").delete({
        tagId: this.tag.id,
        photoId: this.file.id,
      })
    },
  },
  components: {
    VueDraggableResizable,
    PhotoTagForm,
  },
}
</script>

<style lang="scss" scoped>
.photo-tag {
  cursor: pointer;
  border: 1px solid #fff;
  box-shadow: 0px 0px 0px 1px #000;
}
.photo-tag.photo-tag-new {
  display: block;
  border-style: dashed;
}

.photo-tag-label {
  cursor: default;
  display: none;
  position: absolute;
  bottom: -25px;
  left: -1px;
  background-color: #fff;
  white-space: nowrap;
  padding: 0 5px;
  border-top: 5px solid transparent;
  background-clip: padding-box;
}
.photo-tag:hover > .photo-tag-label {
  display: block;
}

.photo-tag:hover,
.photo-tag.active {
  border-style: dashed;
  cursor: move;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  cursor: grab;
}
</style>
