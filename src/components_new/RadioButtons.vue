<template>
  <div class="radio-buttons">
    <label class="radio-buttons--label">
      {{ label }}
    </label>

    <label
      v-for="option in options"
      :key="option.key"
      class="radio-buttons--option"
    >
      <input
        :value="option.value"
        :name="groupName"
        :checked="value && value.key === option.key"
        @click="$emit('input', option)"
        type="radio"
        class="radio-buttons--option-input"
      />
      <span
        class="radio-buttons--option-label"
        :class="{ active: value && value.key === option.key }"
      >
        {{ option.value }}
      </span>
    </label>
  </div>
</template>

<script>
import uuid from "@/lib/uuid";

export default {
  name: "RadioButtons",
  props: {
    value: {
      type: Object,
    },
    options: {
      type: Array,
      default: [],
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      groupName: `radio-button-group-${uuid()}`,
    }
  },
}
</script>

<style lang="scss" scoped>
.radio-buttons {
  display: flex;
  align-items: center;
}
.radio-buttons--label {
  margin-right: 16px;
  white-space: nowrap;
}
.radio-buttons--option {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.radio-buttons--option:hover .radio-buttons--option-label {
  color: $colors-highlight;
}
.radio-buttons--option-input {
  cursor: pointer;
}
.radio-buttons--option-label {
  cursor: pointer;
  color: $colors-light-grey;
  margin: 0 12px 0 4px;
  transition: color 0.15s ease-out;
}
.radio-buttons--option-label.active {
  color: $colors-dark-grey;
}
</style>
