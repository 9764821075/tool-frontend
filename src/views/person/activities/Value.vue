<template>
  <div>
    <InternalLink :resource="activity" />

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
  name: "PersonActivityValue",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isPersonActivity() {
      return this.record.hasOwnProperty("activity")
    },
    activity() {
      return this.isPersonActivity ? this.record.activity : this.record
    },
    date() {
      if (!this.activity) { return }
      return dateHelper.formatDate(this.activity)
    },
    location() {
      return compact([
        this.activity.location,
        this.activity.city,
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
