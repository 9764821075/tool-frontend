<template>
  <InlineSection headline="Attributes" @focus="hasFocus = arguments[0]">
    <InlineStringAttribute name="author" label="Author" :editable="hasFocus" />
    <InlineUrlAttribute name="url" label="URL" :editable="hasFocus" />
    <InlineStringAttribute name="published_at" label="Published at" :editable="hasFocus" />
  </InlineSection>
</template>

<script>
import {
  InlineSection,
  InlineUrlAttribute,
  InlineStringAttribute,
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
    InlineUrlAttribute,
    InlineStringAttribute,
  },
}
</script>
