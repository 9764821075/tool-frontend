<template>
  <div class="app-textfield" :class="{ rounded, small }">
    <input
      :id="id"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      ref="input"
      class="app-textfield--input"
      autocomplete="nope"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @keydown="$emit('keydown', $event)"
    />
    <div
      @click="clearInput"
      class="app-textfield--clear-icon"
    >
      <XIcon size="1x" />
    </div>
  </div>
</template>

<script>
import { XIcon } from "vue-feather-icons"

export default {
  name: "AppTextfield",
  props: {
    autofocus: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },
    value: {
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: null,
    },
    maxlength: {
      type: String,
      default: "250",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
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
    clearInput() {
      this.$emit("input", null)
      this.$emit("cleared")
      this.$nextTick(() => this.focus())
    },
  },
  watch: {
    autofocus(value) {
      if (value) {
        this.focus()
      }
    },
  },
  components: {
    XIcon,
  },
}
</script>

<style lang="scss" scoped>
.app-textfield {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 100%;
  width: 100%;
  height: 32px
}
.app-textfield.small {
  height: 25px;
}
.app-textfield.small .app-textfield--input {
  font-size: .8rem;
  padding: 0 8px;
}
.app-textfield.small .app-textfield--clear-icon {
  top: 2px;
  right: 0;
  padding: 2px 4px 0 3px;
}
.app-textfield.rounded .app-textfield--input {
  padding: 0 16px;
  border-radius: 50px;
}
.app-textfield.rounded .app-textfield--clear-icon {
  right: 6px;
}
.app-textfield--clear-icon {
  position: absolute;
  top: 3px;
  right: 3px;
  background: $colors-lighter-grey;
  padding: 4px 4px 2px 5px;
  margin-right: 3px;
  color: darken($colors-lighter-grey, 12%);
  transition: color 0.15s ease-out;
}
.app-textfield--clear-icon:hover {
  cursor: pointer;
  color: $colors-highlight;
}
.app-textfield--input {
  padding: 0 12px;
  height: 100%;
  max-width: 100%;
  width: 100%;

  color: $colors-dark-grey;
  background: $colors-lighter-grey;
  border: 1px solid darken($colors-lighter-grey, 1%);
  border-radius: 3px;
}
.app-textfield--input:hover {
  border-color: darken($colors-lighter-grey, 4%);
}
.app-textfield--input::placeholder {
  color: $colors-light-grey;
  transition: color 0.15s ease-out;
}
.app-textfield--input:focus {
  outline: 0;
}
</style>
