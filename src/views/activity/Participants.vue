<template>
  <InlineAssociationSection
    resource="activity"
    association="participants"
    :sort-function="sortFunction"
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
import { sortBy } from "lodash"
import { InlineAssociationSection } from "@/components_new/inline"
import Form from "./participants/Form.vue"
import Value from "./participants/Value.vue"

export default {
  name: "Participants",
  methods: {
    sortFunction(records) {
      return sortBy(records, "person.name")
    },
  },
  components: {
    InlineAssociationSection,
    Form,
    Value,
  },
}
</script>
