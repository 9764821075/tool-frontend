<template>
  <div>
    <div v-if="record.address.name">{{ record.address.name }}</div>
    <div v-if="record.address.line1">{{ record.address.line1 }}</div>

    <div v-if="record.address.city">
      <span v-if="record.address.zip_code">{{ record.address.zip_code }}</span>
      {{ record.address.city }}
    </div>

    <div v-if="record.address.country">
      {{ record.address.country.name }}
    </div>

    <div v-if="sinceUntil" class="small-font light-grey-color">
      {{ sinceUntil }}
    </div>
  </div>
</template>

<script>
import dateHelper from "@/lib/date_helper"

export default {
  name: "PersonAddressValue",
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
