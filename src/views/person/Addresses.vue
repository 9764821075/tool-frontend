<template>
  <InlineAssociationSection
    resource="person"
    association="addresses"
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
import Form from "./addresses/Form.vue"
import Value from "./addresses/Value.vue"

export default {
  name: "Addresses",
  methods: {
    sortFunction(records) {
      return sortBy(records, "address.name")
    },
  },
  components: {
    InlineAssociationSection,
    Form,
    Value,
  },
}
</script>
