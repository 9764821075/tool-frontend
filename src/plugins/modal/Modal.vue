<template>
  <div v-if="active" class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content" :style="{ width: wide ? '60%' : '40%' }">
      <div class="box" style="padding: 0;">
        <slot />
      </div>
      <button class="modal-close" @click="close"></button>
    </div>
  </div>
</template>

<script>
  import Modal from "./index"

  export default {
    name: "Modal",
    props: {
      name: {
        type: String,
        required: true,
      },
      wide: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        active: false,
      }
    },
    beforeMount() {
      Modal.event.$on("toggle", (name, state, params) => {
        if (name === this.name) {
          if (typeof state === "undefined") {
            state = !this.visible
          }

          this.toggle(state, params)
        }
      })
    },
    methods: {
      toggle(state, params) {
        if (state === this.active) { return }

        const beforeEvent = state ? "before-open" : "before-close"
        const afterEvent = state ? "opened" : "closed"

        this.$emit(beforeEvent, params)

        this.active = state

        this.$nextTick(() => {
          this.$emit(afterEvent, params)
        })
      },
      close() {
        this.toggle(false)
      },
    },
  }
</script>
