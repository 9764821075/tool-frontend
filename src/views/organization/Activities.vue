<template>
  <InlineAssociationSection
    resource="organization"
    association="activities"
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
import { orderBy } from "lodash"
import dateHelper from "@/lib/date_helper"
import { InlineAssociationSection } from "@/components_new/inline"
import Form from "./activities/Form.vue"
import Value from "./activities/Value.vue"

export default {
  name: "Activities",
  methods: {
    sortFunction(records) {
      return orderBy(records, record => {
        const activity = record.activity

        if (!activity) {
          return "99999999"
        }

        const year  = activity.date_year
        const month = dateHelper.padNumber(activity.date_month)
        const day   = dateHelper.padNumber(activity.date_day)

        return `${year}${month}${day}`
      }, "desc")
    },
  },
  components: {
    InlineAssociationSection,
    Form,
    Value,
  },
}
</script>
