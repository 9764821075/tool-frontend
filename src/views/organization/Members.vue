<template>
  <InlineAssociationSection
    resource="organization"
    association="members"
    :sort-function="sortFunction"
    layout="row"
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
import Form from "./members/Form.vue"
import Value from "./members/Value.vue"

export default {
  name: "Members",
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
