<template>
  <a
    href="#"
    @click.prevent="$emit('click')"
    class="inline-edit-button"
    :class="layout"
  >
    <Edit2Icon
      size="1x"
      class="inline-edit-button--icon"
    />
  </a>
</template>

<script>
import { Edit2Icon } from "vue-feather-icons"

export default {
  name: "InlineEditButton",
  props: {
    layout: {
      type: String,
      default: 'column',
    },
  },
  components: {
    Edit2Icon,
  },
}
</script>

<style lang="scss" scoped>
.inline-edit-button {
  cursor: pointer;
  position: absolute;
  z-index: 50;
  opacity: 1;
}
.inline-edit-button.column {
  left: -28px;
  top: -2px;
}
.inline-edit-button:hover > .inline-edit-button--icon {
  color: $colors-highlight;
}
.inline-edit-button--icon {
  color: $colors-light-grey;
  transition: opacity .15s ease-out, color .35s ease-out;
}

.inline-edit-button.row {
  top: 118px;
  right: 8px;
  left: initial;
  background: $colors-light-grey;
  border-radius: 6rem;
  padding: 3px 6px 1px;
  transition: background .15s ease-out;
}
.inline-edit-button.row:hover {
  background: $colors-highlight;
}
.inline-edit-button.row .inline-edit-button--icon,
  .inline-edit-button.row:hover .inline-edit-button--icon {
  color: $colors-white;
}
</style>
