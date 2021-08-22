<template>
  <div class="form-field" :class="{ 'no-margin': noMargin }">
    <label>
      <div
        v-if="label"
        class="form-field--label"
        :class="{ 'has-error': error }"
      >
        {{ label }}
      </div>

      <div class="form-field--input">
        <slot />
      </div>
    </label>

    <div v-if="hint" class="form-field--hint">
      {{ hint }}
    </div>

    <div v-if="error" class="form-field--error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FormField",
  props: {
    label: {
      type: String,
    },
    hint: {
      type: String,
    },
    error: {
      type: String,
      default: null,
    },
    noMargin: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.form-field {
  margin-bottom: 15px;
}
.form-field.no-margin {
  margin-bottom: 0;
}
.form-field--label {
  cursor: pointer;
  display: inline-block;
  padding-bottom: 4px;
  font-size: .8rem;
}
.form-field--label.has-error {
  color: $colors-error;
}
.form-field--input {
  width: 100%;
  height: 100%;
}
.form-field--hint {
  font-size: .8rem;
  font-style: italic;
  color: $colors-light-grey;
  padding: 4px 0 8px 0;
}
.form-field--error {
  color: $colors-error;
  font-size: .8rem;
  font-style: italic;
  margin: 3px 0 12px 0;
}
</style>
