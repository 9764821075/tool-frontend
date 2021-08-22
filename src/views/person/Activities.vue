<template>
  <InlineAssociationSection
    resource="person"
    association="activities"
    :sort-function="sortFunction"
    :disable-edit-function="disableEditFunction"
  >
    <template #form="{ record, association, events }">
      <Form :record="record" :association="association" :events="events" />
    </template>
    <template #value="{ record }">
      <Value :record="record" />
    </template>
  </InlineAssociationSection>
  <!-- show-icon="camera" -->
  <!-- @show-record="showPhotos" -->
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
        const activity = record.hasOwnProperty("activity") ? record.activity : record

        if (!activity) {
          return "99999999"
        }

        const year  = activity.date_year
        const month = dateHelper.padNumber(activity.date_month)
        const day   = dateHelper.padNumber(activity.date_day)

        return `${year}${month}${day}`
      }, "desc")
    },
    disableEditFunction(record) {
      return !record.hasOwnProperty("activity")
    },
    // showPhotos(activity) {
    //   const personId = this.$store.state.resource.id

    //   this.axios.get(`activities/${activity.id}/photos_of_person`, { params: { person_id: personId } })
    //     .then(response => { this.$gallery.show(response.data, 0) })
    // },
  },
  components: {
    InlineAssociationSection,
    Form,
    Value,
  },
}
</script>
