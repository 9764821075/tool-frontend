<template>
  <div style="width: 125px">
    <InternalLink :resource="record.organization" />
    <div v-if="record.role" class="small-font light-grey-color">
      {{ record.role }}
    </div>
  </div>
</template>

<script>
import { InternalLink } from "@/components_new"

export default {
  name: "ActivityOrganizationValue",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  components: {
    InternalLink,
  },
}
</script>
