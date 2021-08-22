<template>
  <div class="primary-photo">
    <figure class="image" :class="[orientationClass]" :style="{ background: fileColor }">

      <!-- LOADING -->
      <i v-if="!missing" class="fa fa-refresh primary-photo-icon"></i>

      <!-- MISSING -->
      <i v-if="missing" class="fa fa-times primary-photo-icon"></i>

      <template v-if="loaded">
        <img
          :src="fileSrc"
          :key="fileSrc"
          loading="lazy"
          v-tippy="tooltipOptions"
          @click="openInGallery"
          class="primary-photo-img"
          alt="">

        <MediaItemTooltip
          id="primary-photo-tooltip"
          :file="file" />
      </template>

    </figure>
  </div>
</template>

<script>
  import MediaItemTooltip from "@/components/media/MediaItemTooltip.vue"

  export default {
    name: "PrimaryPhoto",
    props: {
      orientation: {
        type: String,
        required: true,
      },
    },
    created() {
      this.$store.dispatch(`${this.$store.state.resource.singular}/primaryPhoto/fetch`)
    },
    computed: {
      state() {
        return this.$store.state[this.$store.state.resource.singular].primaryPhoto
      },
      loaded() {
        return this.state.loaded
      },
      missing() {
        return this.state.missing
      },
      isPortrait() {
        return this.orientation == "portrait"
      },
      orientationClass() {
        return this.isPortrait ? "is-4by5" : "is-3by2"
      },
      file() {
        return this.state.data
      },
      fileSrc() {
        return this.isPortrait ? this.file.portrait_preview_url : this.file.landscape_preview_url
      },
      fileColor() {
        return this.file.color || "#eee"
      },
      tooltipOptions() {
        if (this.hasTooltipContent) {
          return {
            html: "#primary-photo-tooltip",
            interactive: true,
            reactive: true,
            placement: "bottom",
            arrow: true,
          }
        }

        return {}
      },
      hasTooltipContent() {
        if (!this.loaded) { return false }

        return this.file.description ||
               (this.file.sources && this.file.sources.length)
      },
    },
    methods: {
      openInGallery() {
        this.$gallery.show([this.file], 0)
      },
    },
    components: {
      MediaItemTooltip,
    },
  }
</script>

<style lang="scss" scoped>
.primary-photo {
  margin-bottom: 5rem;
}

.primary-photo-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -.3rem;
  text-align: center;
  font-size: 4rem;
  color: rgba(255, 255, 255, .9);
}

.primary-photo-img {
  cursor: pointer;
}
</style>
