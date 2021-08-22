<template>
  <div>
    <InternalLink :resource="record.organization" />
    <div v-if="record.position" class="small-font light-grey-color">
      {{ record.position }}
    </div>
  </div>
</template>

<script>
import { InternalLink } from "@/components_new"

export default {
  name: "PersonOrganizationValue",
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

      subtext() {
        let subtext = dateHelper.formatSinceUntil(this.record)

        if (subtext && this.record.position) { subtext += ", " }
        if (this.record.position) { subtext += this.record.position }

        return subtext
      },
