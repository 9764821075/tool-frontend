<template>
  <div class="resource-select">
    <SearchSelect
      :value="localValue"
      @input="onInput"
      :options="options"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :rounded="rounded"
      key-field="id"
      value-field="name"
    />
  </div>
</template>

<script>
import axios from "axios"
import SearchSelect from "@/components_new/SearchSelect"

export default {
  name: "ResourceSelect",
  props: {
    value: {
      type: Object,
      default: null,
    },
    resource: {
      type: String,
      required: true,
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
  },
  data() {
    return {
      options: [],
      localValue: null,
    }
  },
  created() {
    if (this.value) {
      this.localValue = this.value
    }

    axios
      .get(`/${this.resource}/list`)
      .then(response => this.options = response.data)
  },
  methods: {
    onInput(option) {
      if (!option) {
        this.$emit("input", null)
        return
      }

      this.$emit('input', option)
    },
  },
  watch: {
    value(value) {
      if (!value) {
        this.localValue = null
        return
      }

      this.localValue = value
    },
  },
  components: {
    SearchSelect,
  },
}
</script>

<style scoped>
.resource-select {
  width: 100%;
}
</style>
