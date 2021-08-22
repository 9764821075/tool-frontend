<template>
  <InlineAssociationSection
    resource="person"
    association="relationships"
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
import { InlineAssociationSection } from "@/components_new/inline"
import Form from "./relationships/Form.vue"
import Value from "./relationships/Value.vue"

export default {
  name: "Relationships",
  methods: {
    sortFunction(records) {
      return records.sort((a, b) => {
        const aName = (a.person && a.person.name) || (a.friend && a.friend.name)
        const bName = (b.person && b.person.name) || (b.friend && b.friend.name)
        if (aName < bName) { return -1 }
        if (aName > bName) { return 1 }
        return 0
      })
    },
  },
  components: {
    InlineAssociationSection,
    Form,
    Value,
  },
}
</script>
