<template>
  <div>
    <InternalLink :resource="otherPerson" />

    <div class="small-font light-grey-color">
      {{ status }}
    </div>
  </div>
</template>

<script>
import relationshipStatuses from "@/lib/relationship_statuses"
import { InternalLink } from "@/components_new"

export default {
  name: "PersonRelationshipValue",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  computed: {
    otherPerson() {
      if (this.record.person && this.record.friend && this.record.friend.id == this.$store.state.resource.id) {
        return this.record.person
      }

      if (this.record.friend && this.record.person && this.record.person.id == this.$store.state.resource.id) {
        return this.record.friend
      }

      return this.record.person || this.record.friend
    },
    status() {
      return relationshipStatuses[this.record.status]
    },
  },
  components: {
    InternalLink,
  },
}
</script>
