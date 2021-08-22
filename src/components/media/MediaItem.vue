<template>
  <div class="column media-item-size media-button-container">
    <figure class="image" :class="[orientationClass]" :style="{ background: fileColor }">

      <!-- UPLOADING -->
      <i v-if="!fileSrc" class="fa fa-cloud-upload media-item-icon"></i>

      <template v-else>
        <i class="fa fa-refresh media-item-icon"></i>

        <div class="media-button-group">
          <a
            v-if="enablePrimaryPhotoButton"
            @click.prevent="setPrimaryPhoto"
            class="media-button"
            title="Set as profile photo"
            v-tippy="{ placement : 'top', arrow: 'bottom' }"
          >
            <span class="fa-stack">
              <i class="fa fa-stack-2x fa-circle media-button-background"></i>
              <i class="fa fa-stack-1x fa-user-circle-o media-button-icon"></i>
            </span>
          </a>

          <a @click.prevent="edit" class="media-button">
            <span class="fa-stack">
              <i class="fa fa-stack-2x fa-circle media-button-background"></i>
              <i class="fa fa-stack-1x fa-pencil media-button-icon"></i>
            </span>
          </a>
        </div>

        <i v-if="isVideo" class="activity-video-icon fa fa-fw fa-2x fa-play-circle-o"></i>

        <img
          :src="fileSrc"
          :key="fileSrc"
          loading="lazy"
          v-tippy="tooltipOptions"
          @click="showItem"
          class="media-item"
          alt="">

        <MediaItemTooltip
          :id="'media-item-tooltip-' + file.id"
          :file="file" />
      </template>
    </figure>
  </div>
</template>

<script>
  import MediaItemTooltip from "./MediaItemTooltip.vue"

  export default {
    name: "MediaItem",
    props: {
      index: {
        type: Number,
        required: true,
      },
      file: {
        type: Object,
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
      enablePrimaryPhotoButton: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      isPortrait() {
        return this.orientation == "portrait"
      },
      isVideo() {
        return this.type == "videos"
      },
      orientationClass() {
        return this.isPortrait ? "is-4by5" : "is-3by2"
      },
      fileSrc() {
        return this.isPortrait ? this.file.portrait_preview_url : this.file.landscape_preview_url
      },
      fileColor() {
        return this.file.color || "#eee"
      },
      tooltipOptions() {
        if (!this.hasTooltipContent) { return {} }

        return {
          html: "#media-item-tooltip-" + this.file.id,
          interactive: true,
          reactive: true,
          arrow: true,
        }
      },
      hasTooltipContent() {
        return this.file.description ||
               (this.file.tags && this.file.tags.length) ||
               (this.file.sources && this.file.sources.length)
      },
    },
    methods: {
      showItem(event) {
        this.$emit("show", this.index, event.target)
      },
      edit() {
        this.$emit("edit", this.file)
      },
      setPrimaryPhoto() {
        this.$emit("set-primary-photo", this.file)
      },
    },
    components: {
      MediaItemTooltip,
    },
  }
</script>

<style lang="scss">
  .column.media-item-size {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    width: 19.8%;
    padding: 0.3rem;
  }

  .media-item {
    cursor: pointer;
    border: 1px solid #eee;
  }

  .media-button-group {
    position: absolute;
    right: 5px;
    bottom: 5px;
    z-index: 10;
  }

  .media-button {
    opacity: 0;
    transition: opacity .15s ease-out;
  }
  .media-button .media-button-background {
    color: #fff;
    transition: color .15s ease-out;
  }
  .media-button .media-button-icon {
    color: #000;
  }

  .media-button.deactivate {
    opacity: 1 !important;
  }

  .media-button:hover,
  .media-button.deactivate {
    opacity: 1 !important;
  }
  .media-button:hover .media-button-icon,
  .media-button.deactivate .media-button-spinner {
    color: #fff;
  }
  .media-button:hover .media-button-background,
  .media-button.deactivate .media-button-background {
    color: #00d1b2;
  }

  .media-button.media-button-inactive:hover .media-button-icon {
    color: #000;
  }
  .media-button.media-button-inactive:hover .media-button-background {
    color: #ccc;
  }

  .media-button-container:hover .media-button {
    opacity: 1;
  }

  .fa.media-item-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: -.25rem;
    text-align: center;
    font-size: 2rem;
    color: rgba(255, 255, 255, .9);
  }
</style>
