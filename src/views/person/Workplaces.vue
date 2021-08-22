<template>
  <InlineAssociationSection
    resource="person"
    association="workplaces"
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
import Form from "./workplaces/Form.vue"
import Value from "./workplaces/Value.vue"

export default {
  name: "Workplaces",
  methods: {
    sortFunction(records) {
      return sortBy(records, "name")
    },
  },
  components: {
    InlineAssociationSection,
    Form,
    Value,
  },
}
</script>
