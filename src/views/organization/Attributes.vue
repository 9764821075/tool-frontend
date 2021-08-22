<template>
  <InlineSection headline="Attributes" @focus="hasFocus = arguments[0]">
    <InlineStringAttribute
      name="shortname"
      label="Shortname"
      hint="Abbreviation to use e.g. in search"
      :editable="hasFocus"
    />
    <!-- TODO: Parent organization -->
    <!-- TODO: <InlineDateAttribute name="founded_at" label="Founded at" /> -->
    <!-- TODO: <InlineDateAttribute name="ended_at" label="Ended at" /> -->
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
