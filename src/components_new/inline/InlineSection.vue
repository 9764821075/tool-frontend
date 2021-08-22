<template>
  <div
    class="inline-section"
    @mouseenter="focus = true"
    @mouseleave="focus = false"
  >
    <InlineAddButton
      v-if="hasAddButton && focus"
      @click="$emit('add')"
    />

    <div class="inline-section--headline">
      {{ headline }}
    </div>

    <slot />
  </div>
</template>

<script>
import InlineAddButton from "./InlineAddButton.vue"

export default {
  name: "InlineSection",
  data() {
    return {
      focus: false,
    }
  },
  props: {
    headline: {
      type: String,
    },
    hasAddButton: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    focus(value) {
      this.$emit('focus', value)
    },
  },
  components: {
    InlineAddButton,
  },
}
</script>

<style lang="scss" scoped>
.inline-section {
  position: relative;
  padding: 10px 0 50px 32px;
  margin-left: -32px;
}
.inline-section--headline {
  padding: 0 20px 2px 1px;
  margin-bottom: 24px;

  color: $colors-dark-grey;
  background: $colors-white;
  border-bottom: 1px solid #4e4e4e;

  font-size: .55rem;
  font-weight: 900;
  letter-spacing: .2rem;
  text-transform: uppercase;
}
</style>
