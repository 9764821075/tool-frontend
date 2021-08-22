<template>
  <InlineSection headline="Attributes" @focus="hasFocus = arguments[0]">
    <InlineStringAttribute name="date_of_birth" label="Date of birth" :editable="hasFocus" />
    <InlineStringAttribute name="date_of_death" label="Date of death" :editable="hasFocus" />
    <InlineStringAttribute name="birth_name" label="Birth name" :editable="hasFocus" />
    <InlineStringAttribute name="place_of_birth" label="Place of birth" :editable="hasFocus" />
    <InlineStringAttribute name="phone" label="Phone" :editable="hasFocus" />
    <InlineStringAttribute name="email" label="Email" :editable="hasFocus" />
  </InlineSection>
</template>

<script>
import { InlineSection, InlineStringAttribute } from "@/components_new/inline"

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
  },
}
</script>
