<template>
  <div class="app-image" :style="{ width, height }">
    <div v-if="!src" class="app-image--icon">
      <slot name="icon" />
    </div>

    <div v-else-if="isError" class="app-image--icon">
      <AlertCircleIcon :size="size" />
    </div>

    <div v-else-if="isLoading" class="app-image--icon">
      <LoaderIcon :size="size" />
    </div>

    <img
      v-else
      :src="localSrc"
      ref="image"
      class="app-image--image"
      alt=""
    />
  </div>
</template>

<script>
import { AlertCircleIcon, LoaderIcon } from "vue-feather-icons"

export default {
  name: "AppImage",
  props: {
    src: {
      type: String,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    size: {
      type: String,
      default: "2x",
    },
  },
  data() {
    return {
      isLoading: true,
      isError: false,
      localSrc: null,
    }
  },
  created() {
    if (!this.src) { return }

    const image = new Image()

    image.onload = () => {
      this.localSrc = this.src
      this.isLoading = false
    }

    image.onerror = () => {
      this.isError = true
      this.isLoading = false
    }

    image.src = this.src
  },
  components: {
    AlertCircleIcon,
    LoaderIcon,
  },
}
</script>

<style lang="scss" scoped>
.app-image {
  position: relative;
  background: $colors-lighter-grey;
  border: 1px solid darken($colors-lighter-grey, 1%);
  border-radius: 3px;
  overflow: hidden;
  line-height: 0;
  transition: border 0.15s ease-out;
}
.app-image:hover {
  border-color: darken($colors-lighter-grey, 4%);
}
.app-image--icon {
  position: absolute;
  color: $colors-light-grey;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);
}
.app-image--image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
