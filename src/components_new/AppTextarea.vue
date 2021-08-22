<template>
  <div class="app-textarea">
    <textarea
      :value="value"
      :rows="rows"
      @input="$emit('input', $event.target.value)"
      ref="input"
      class="app-textarea--input"
    />
  </div>
</template>

<script>
export default {
  name: "AppTextarea",
  props: {
    autofocus: {
      type: Boolean,
      default: false,
    },
    value: {
      default: null,
    },
    rows: {
      type: String,
      default: "10",
    },
  },
  mounted() {
    if (this.autofocus) {
      this.focus()
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
  },
  watch: {
    autofocus(value) {
      if (value) {
        this.focus()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-textarea--input {
  box-sizing: border-box;
  padding: 8px 12px;
  max-width: 100%;
  width: 100%;
  height: 100%;

  color: $colors-dark-grey;
  background: $colors-lighter-grey;
  border: 1px solid darken($colors-lighter-grey, 1%);
  border-radius: 3px;
}
.app-textarea--input:hover {
  border-color: darken($colors-lighter-grey, 4%);
}
.app-textarea--input:focus {
  outline: 0;
}
</style>
