<template>
  <div>
    <InternalLink :resource="record.activity" />

    <div v-if="date || location" class="activity--date-location">
      {{ date }}
      <span v-if="date && location" class="activity--date-location-divider">
        &middot;
      </span>
      {{ location }}
    </div>

    <div v-if="record.role" class="activity--role">
      {{ record.role }}
    </div>
  </div>
</template>

<script>
import { compact } from "lodash"
import { InternalLink } from "@/components_new"
import dateHelper from "@/lib/date_helper"

export default {
  name: "OrganizationActivityValue",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  computed: {
    date() {
      if (!this.record.activity) { return }
      return dateHelper.formatDate(this.record.activity)
    },
    location() {
      return compact([
        this.record.activity.location,
        this.record.activity.city,
      ]).join(", ")
    },
  },
  components: {
    InternalLink,
  },
}
</script>

<style lang="scss" scoped>
.activity--date-location {
  font-size: .8rem;
  color: $colors-light-grey;
}
.activity--date-location-divider {
  margin: 0 4px;
}
.activity--role {
  margin-top: 4px;
}
</style>
