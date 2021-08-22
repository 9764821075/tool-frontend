<template>
  <div class="inline-association" :class="layout">
    <template v-if="loaded">
      <template v-if="records.length">
        <div
          v-for="record in records"
          :key="record.id"
          class="inline-association--item"
          :class="{ [layout]: true, compact, spacious }"
        >
          <InlineEditButton
            v-if="!disableEditFunction(record) && hasFocus"
            @click="$emit('edit', record)"
            :layout="layout"
          />

          <slot :record="record" />
        </div>
      </template>

      <div v-else class="inline-association--empty-state">
        {{ emptyState }}
      </div>
    </template>

    <div
      v-else-if="!loaded && !error"
      class="inline-association--loading-state"
    >
      <div class="spinner"></div>
    </div>

    <div v-else class="inline-association--error-state">
      Error {{ error.response.status }}
    </div>
  </div>
</template>

<script>
import InlineEditButton from "./InlineEditButton.vue"

export default {
  name: "InlineAssociation",
  props: {
    loaded: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Error,
    },
    records: {
      type: Array,
      required: true,
    },
    emptyState: {
      type: String,
      required: true,
    },
    hasFocus: {
      type: Boolean,
      default: false,
    },
    layout: {
      type: String,
      default: "column",
    },
    compact: {
      type: Boolean,
      default: false,
    },
    spacious: {
      type: Boolean,
      default: false,
    },
    disableEditFunction: {
      type: Function,
      default: () => { return false },
    },
  },
  components: {
    InlineEditButton,
  },
}
</script>

<style lang="scss" scoped>
.inline-association {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}
.inline-association.column {
  flex-direction: column;
}
.inline-association.row {
  flex-direction: row;
}
.inline-association--empty-state {
  color: $colors-light-grey;
}
.inline-association--error-state {
  color: $colors-error;
}

.inline-association--item {
  position: relative;
  padding: 0;
}
.inline-association--item:last-child {
  margin-bottom: 0 !important;
}
.inline-association--item.row {
  margin: 0 15px 24px 0;
}
.inline-association--item.column {
  margin-bottom: 16px;
}
.inline-association--item.column.compact {
  margin-bottom: 2px;
}
.inline-association--item.column.spacious {
  margin-bottom: 32px;
}
</style>
