<template>
  <div>
    <div v-if="record.date">
      {{ record.date }}
    </div>

    <div v-if="record.title">
      <b>{{ record.title }}</b>
    </div>

    <Markdown
      v-if="record.text"
      :text="record.text"
    />

    <SourceLink
      v-for="source in record.sources"
      :key="source.id"
      :source="source"
    />
  </div>
</template>

<script>
import SourceLink from "@/components/sources/SourceLink.vue"
import Markdown from "@/components_new/Markdown.vue"

export default {
  name: "NoteValue",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  components: {
    SourceLink,
    Markdown,
  },
}
</script>
