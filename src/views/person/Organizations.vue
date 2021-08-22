<template>
  <InlineAssociationSection
    resource="person"
    association="organizations"
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
import Form from "./organizations/Form.vue"
import Value from "./organizations/Value.vue"

export default {
  name: "Organizations",
  methods: {
    sortFunction(records) {
      return sortBy(records, "organization.name")
    },
  },
  components: {
    InlineAssociationSection,
    Form,
    Value,
  },
}
</script>
