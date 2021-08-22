<template>
  <InlineAssociationSection
    :resource="resource"
    association="notes"
    spacious
  >
    <template #form="{ record, association, events }">
      <Form :record="record" :association="association" :events="events" />
    </template>
    <template #value="{ record }">
      <Value :record="record" />
    </template>
  </InlineAssociationSection>
</template>

<script>
import InlineAssociationSection from "@/components_new/inline/InlineAssociationSection.vue"
import Form from "./Form.vue"
import Value from "./Value.vue"

export default {
  name: "Notes",
  created() {
    this.$store.commit("notes/clear")
  },
  computed: {
    resource() {
      return this.$store.state.resource.singular
    },
  },
  components: {
    InlineAssociationSection,
    Form,
    Value,
  },
}
</script>
