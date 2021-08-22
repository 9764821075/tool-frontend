<template>
  <a
    href="#"
    @click.prevent="$emit('click')"
    class="inline-add-button"
  >
    <PlusIcon
      size="1x"
      class="inline-add-button--icon"
    />
  </a>
</template>

<script>
import { PlusIcon } from "vue-feather-icons"

export default {
  name: "InlineAddButton",
  components: {
    PlusIcon,
  },
}
</script>

<style lang="scss" scoped>
.inline-add-button {
  cursor: pointer;
  position: absolute;
  left: 8px;
  top: 4px;
  z-index: 50;
}
.inline-add-button:hover > .inline-add-button--icon {
  color: $colors-highlight;
}
.inline-add-button--icon {
  color: $colors-light-grey;
  // opacity: 0;
  transition: opacity .15s ease-out, color .35s ease-out;
}
</style>
