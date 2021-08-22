<template>
  <div id="view" class="container">
    <InlineNameAttribute />

    <Attributes />

    <NoteText />

    <MediaGroup type="photos" filetypes=".jpg, .png" orientation="landscape" />
    <MediaGroup type="pdfs" filetypes=".pdf" orientation="portrait" />

    <venobox-gallery />
  </div>
</template>

<script>
import InlineNameAttribute from "@/components_new/inline/InlineNameAttribute.vue"
import MediaGroup from "@/components/media/MediaGroup.vue"

import Attributes from "./source/Attributes.vue"
import NoteText from "./source/Text.vue"

export default {
  name: "Source",
  created() {
    this.$store.dispatch("source/clear")
    this.$store.dispatch("source/fetch")
  },
  components: {
    InlineNameAttribute,
    Attributes,
    NoteText,
    MediaGroup,
  },
}
</script>
