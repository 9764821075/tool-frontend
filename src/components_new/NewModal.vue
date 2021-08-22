<template>
  <div v-if="show">
    <transition name="overlay">
      <div class="modal--overlay" />
    </transition>

    <transition name="modal">
      <div
        @click.self="$emit('close')"
        class="modal--container"
      >
        <div
          class="modal--content"
          :class="{ wide }"
        >
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "NewModal",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    wide: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.modal--overlay {
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .8);
}
.modal--container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
}
.modal--content {
  width: 400px;
  margin: 0px auto;
  background-color: $colors-white;
  border: 1px solid darken($colors-white, 6%);
  border-radius: 3px;
  box-shadow: 0 0px 125px 0px
}
.modal--content.wide {
  width: 800px;
}

.overlay-enter, .overlay-leave-to {
  opacity: 0;
}
.overlay-enter-active, .overlay-leave-active {
  transition: opacity 0.2s ease-out;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.modal-enter-active, .modal-leave-active {
  transition: transform .3s ease-out, opacity .2s ease-out;
}
</style>
