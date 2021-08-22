<template>
  <div>
    <InternalLink :resource="record.person" />
    <span v-if="record.role" class="small-font light-grey-color">
      ({{ record.role }})
    </span>

    <div class="small-font light-grey-color">
      <div
        v-for="organization in record.person.organizations"
        :key="organization.id"
      >
        <InternalLink :resource="organization" />
      </div>
    </div>
  </div>
</template>

<script>
import { InternalLink } from "@/components_new"

export default {
  name: "ActivityParticipantValue",
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
