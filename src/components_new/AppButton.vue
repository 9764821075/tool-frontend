<template>
  <div class="app-button">
    <button
      :type="type"
      class="app-button--button"
      :class="{ small, primary, dangerous }"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    dangerous: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
    },
  },
}
</script>

<style lang="scss" scoped>
.app-button--button {
  background: $colors-dark-grey;
  border: 1px solid darken($colors-dark-grey, 4%);
  border-radius: 3rem;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: $colors-white;
  padding: .5rem 1.25rem;
  transition: background 0.15s ease-out, color 0.15s ease-out, border 0.15s ease-out;
}
.app-button--button:hover {
  cursor: pointer;
  background: darken($colors-dark-grey, 12%);
  border-color: lighten($colors-dark-grey, 15%);
}
.app-button--button:focus {
  outline: 0;
}
.app-button--button.small {
  font-size: .8rem;
  padding: .3rem .85rem;
}
.app-button--button.primary {
  background: $colors-highlight;
  color: $colors-white;
  border-color: darken($colors-highlight, 2%);
}
.app-button--button.primary:hover {
  background: darken($colors-highlight, 5%);
  border-color: lighten($colors-highlight, 3%);
}
.app-button--button.dangerous {
  background: $colors-lighter-grey;
  color: $colors-dark-grey;
  border-color: darken($colors-lighter-grey, 1%);
}
.app-button--button.dangerous:hover {
  background: $colors-error;
  color: $colors-white;
  border-color: lighten($colors-error, 10%);
}
</style>
