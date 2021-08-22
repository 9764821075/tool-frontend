<template>
  <div class="search-select">
    <AppTextfield
      v-model="query"
      ref="input"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :rounded="rounded"
      @keydown.enter.prevent="selectOption"
      @keydown.up.prevent="moveUp"
      @keydown.down.prevent="moveDown"
      @focus="onFocus"
      @blur="onBlur"
      @cleared="onCleared"
    />

    <ol
      v-if="showOptionList"
      class="search-select--option-list"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="option[keyField]"
        class="search-select--option"
        :class="{ selected: selectionIndex === index }"
        :ref="`option${index}`"
        @mouseover="selectionIndex = index"
        @mousedown="selectOption"
      >
        {{ option[valueField] }}
      </li>
    </ol>
  </div>
</template>

<script>
import Fuse from "fuse.js"
import AppTextfield from "@/components_new/AppTextfield.vue"

export default {
  name: "SearchSelect",
  data() {
    return {
      query: null,
      localOption: null,
      selectionIndex: 0,
      hasFocus: false,
    }
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
    options: {
      type: Array,
      default: [],
    },
    placeholder: {
      type: String,
      default: null,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    keyField: {
      type: String,
      default: "key",
    },
    valueField: {
      type: String,
      default: "value",
    },
  },
  mounted() {
    this.localOption = this.value
    if (this.localOption) {
      this.query = this.localOption[this.valueField]
    }
  },
  computed: {
    filteredOptions() {
      if (!this.query) {
        return this.options
      }

      return this.fuse
        .search(this.query)
        .slice(0, 100)
    },
    fuse() {
      return new Fuse(this.options, {
        shouldSort: true,
        threshold: 0.6,
        maxPatternLength: 30,
        minMatchCharLength: 1,
        keys: [this.valueField]
      })
    },
    isDirty() {
      if (!this.query) { return false }
      if (this.localOption) {
        return this.localOption[this.valueField] !== this.query
      }
      return true
    },
    showOptionList() {
      return this.hasFocus &&
             this.isDirty &&
             this.filteredOptions.length
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    onFocus() {
      this.hasFocus = true
      this.selectionIndex = 0
    },
    onBlur() {
      this.hasFocus = false

      if (!this.query || this.isDirty) {
        this.query = null
        this.localOption = null
        this.$emit("input", null)
      }
    },
    onCleared() {
      this.query = null
      this.localOption = null
      this.$emit("input", null)
    },
    selectOption() {
      this.localOption = this.filteredOptions[this.selectionIndex]
      this.query = this.localOption[this.valueField]
      this.$emit("input", this.localOption)
    },
    moveUp() {
      if (!this.isDirty) { return }

      if (this.selectionIndex - 1 < 0) {
        this.selectionIndex = this.filteredOptions.length - 1
      } else {
        this.selectionIndex--
      }

      this.scrollOptionIntoView()
    },
    moveDown() {
      if (!this.isDirty) { return }

      if (this.selectionIndex + 1 >= this.filteredOptions.length) {
        this.selectionIndex = 0
      } else {
        this.selectionIndex++
      }

      this.scrollOptionIntoView()
    },
    scrollOptionIntoView() {
      const optionRef = this.$refs[`option${this.selectionIndex}`]
      if (!optionRef) { return }

      const option = optionRef[0]
      if (!option) { return }

      option.scrollIntoView({
        behavior: "instant",
        block: "end",
        inline: "nearest",
      })
    },
  },
  watch: {
    value(value) {
      this.localOption = value
      if (this.localOption) {
        this.query = this.localOption[this.valueField]
      }
    },
    query() {
      this.selectionIndex = 0
      this.scrollOptionIntoView()
    },
  },
  components: {
    AppTextfield,
  },
}
</script>

<style lang="scss" scoped>
.search-select {
  position: relative;
  width: 100%;
}
.search-select--option-list {
  list-style: none;
  position: absolute;
  z-index: 1000;
  left: 0;
  top: 40px;
  right: 0;
  max-height: 110px;
  overflow-y: scroll;
  border-radius: 3px;
  border: 1px solid #2b2b2b;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, .5);
}
.search-select--option {
  cursor: pointer;
  background: $colors-dark-grey;
  color: $colors-lighter-grey;
  padding: 5px 15px;
  border-bottom: 1px solid #2b2b2b;
}
.search-select--option:last-child {
  border-bottom: 0;
}
.search-select--option.selected {
  background: darken($colors-dark-grey, 6%);
}
</style>
