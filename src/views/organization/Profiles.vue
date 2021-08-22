<template>
  <InlineAssociationSection
    resource="organization"
    association="profiles"
    :sort-function="sortFunction"
    compact
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
import Form from "./profiles/Form.vue"
import Value from "./profiles/Value.vue"

export default {
  name: "Profiles",
  methods: {
    sortFunction(records) {
      return sortBy(records, ["service", "username"])
    },
  },
  components: {
    InlineAssociationSection,
    Form,
    Value,
  },
}
</script>
