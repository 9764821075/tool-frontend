<template>
  <div>
    <div v-if="record.name">{{ record.name }}</div>
    <div v-if="record.position">{{ record.position }}</div>

    <div v-if="record.line1">{{ record.line1 }}</div>

    <div v-if="record.city">
      <span v-if="record.zip_code">{{ record.zip_code }}</span>
      {{ record.city }}
    </div>

    <div v-if="record.country">
      {{ record.country.name }}
    </div>

    <div v-if="sinceUntil" class="small-font light-grey-color">
      {{ sinceUntil }}
    </div>
  </div>
</template>

<script>
import dateHelper from "@/lib/date_helper"

export default {
  name: "PersonWorkplaceValue",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sinceUntil() {
      return dateHelper.formatSinceUntil(this.record)
    },
  },
}
</script>

