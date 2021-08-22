<template>
  <InlineSection headline="Attributes" @focus="hasFocus = arguments[0]">
    <InlineDateAttribute name="date" :editable="hasFocus" />
    <InlineStringAttribute name="location" label="Location" :editable="hasFocus" />
    <InlineStringAttribute
      name="attendance"
      label="Attendance"
      hint="Number of people participating in the activity"
      :editable="hasFocus"
    />
  </InlineSection>
</template>

<script>
import {
  InlineSection,
  InlineStringAttribute,
  InlineDateAttribute,
} from "@/components_new/inline"

export default {
  name: "Attributes",
  data() {
    return {
      hasFocus: false,
    }
  },
  components: {
    InlineSection,
    InlineStringAttribute,
    InlineDateAttribute,
  },
}
</script>
