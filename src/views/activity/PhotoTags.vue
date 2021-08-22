<template>
  <InlineSection
    :headline="headline"
    @focus="hasFocus = arguments[0]"
  >
    <InlineAssociation
      :records="records"
      :loaded="loaded"
      :error="error"
      empty-state="No tagged people"
    >
      <template v-slot:default="{ record }">
        <i
          v-if="hasFocus"
          @click.prevent="openInGallery(record.person.id)"
          class="fa fa-fw fa-camera inline-association-icon"
          style="opacity: 1"
        />

        <div>
          <InternalLink :resource="record.person" />

          <div class="small-font">
            <div v-for="organization in record.organizations" :key="organization.id">
              <InternalLink :resource="organization" class="light-grey-color" />
            </div>
          </div>
        </div>
      </template>
    </InlineAssociation>
  </InlineSection>
</template>

<script>
import lodash from "lodash"
import counted from "@/lib/counted"
import { InlineSection, InlineAssociation } from "@/components_new/inline"
import { InternalLink } from "@/components_new"

export default {
  name: "PhotoTags",
  data() {
    return {
      hasFocus: false,
    }
  },
  computed: {
    loaded() {
      return this.$store.state.media.photos.loaded
    },
    error() {
      return this.$store.state.media.photos.error
    },
    headline() {
      return `${this.records.length} tagged ${counted("people", this.records.length)}`
    },
    records() {
      const r = lodash
        .chain(this.$store.state.media.photos.all)
        .flatMap("tags")
        .compact()
        .uniqBy("person_id")
        .sortBy(["person_name"])
        .value()
      console.log('records', r)
      return r
    },
  },
  methods: {
    openInGallery(personId) {
      const files = lodash
        .chain(this.$store.state.media.photos.all)
        .filter(photo => { return lodash.some(photo.tags, { person_id: personId }) })
        .value()

      this.$gallery.show(files, 0, { tagging: true })
    },
  },
  components: {
    InlineSection,
    InlineAssociation,
    InternalLink,
  },
}
</script>
