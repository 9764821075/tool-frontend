<template>
  <div>
    <div style="border-bottom: 1px solid #ddd; padding-bottom: .5rem; margin-bottom: 1rem; font-size: 0.8rem; font-weight: 600;">
      Statuses

      <a @click="addItem" class="icon-link pull-right" style="display: inline-block; padding: 0.5rem 0.5rem; margin: -.3rem -.45rem 0 0;">
        <i class="fa fa-fw fa-plus"></i>
      </a>
    </div>

    <InlineStatusItem
      v-for="status in record.statuses"
      :key="status.id"
      :status="status"
      @delete-item="deleteItem" />
    </div>
  </div>
</template>

<script>
import { findIndex } from "lodash"
import InlineStatusItem from "./InlineStatusItem"

export default {
  name: "InlineStatuses",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addItem() {
      this.record.statuses.push({})
    },
    deleteItem(id) {
      const index = findIndex(this.record.statuses, { id: id })
      this.record.statuses.splice(index, 1)
    },
  },
  components: {
    InlineStatusItem,
  },
}
</script>
