<template>
  <div>
    <div style="border-bottom: 1px solid #ddd; padding-bottom: .5rem; margin-bottom: 1rem; font-size: 0.8rem; font-weight: 600;">
      Sources

      <a @click="addItem" class="icon-link pull-right" style="display: inline-block; padding: 0.5rem 0.5rem; margin: -.3rem -.45rem 0 0;">
        <i class="fa fa-fw fa-plus"></i>
      </a>
    </div>

    <InlineSourceItem
      v-for="source in sortedSources"
      :key="source.id"
      :source="source"
      @delete-item="deleteItem" />
    </div>
  </div>
</template>

<script>
import { findIndex } from "lodash"
import InlineSourceItem from "./InlineSourceItem"

export default {
  name: "InlineSources",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sortedSources() {
      return this.record.sources
    },
  },
  methods: {
    addItem() {
      this.record.sources.push({})
    },
    deleteItem(id) {
      const index = findIndex(this.record.sources, { id: id })
      this.record.sources.splice(index, 1)
    },
  },
  components: {
    InlineSourceItem,
  },
}
</script>
