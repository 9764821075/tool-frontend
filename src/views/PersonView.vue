<template>
  <div id="view" class="container">
    <div class="columns">
      <div class="column is-one-quarter">
        <PrimaryPhoto orientation="portrait" />
        <Activities />
      </div>

      <div class="column">
        <div style="margin-left: 4rem;">
          <InlineNameAttribute />

          <div class="columns" style="margin-bottom: 0;">
            <div class="column" style="padding-bottom: 0; margin-right: 1rem;">
              <Attributes />
              <Organizations />

              <!-- TODO: <Nicknames /> -->

              <Relationships />
            </div>

            <div class="column" style="padding-bottom: 0; margin-left: 1rem;">
              <Profiles />
              <Addresses />
              <Workplaces />
            </div>
          </div>

          <Notes />

          <MediaGroup type="photos" filetypes=".jpg, .png" orientation="portrait" :enable-primary-photo-button="true" />
          <MediaGroup type="screenshots" filetypes=".jpg, .png" orientation="landscape" />
        </div>
      </div>
    </div>

    <venobox-gallery />
  </div>
</template>

<script>
import PrimaryPhoto from "@/components/PrimaryPhoto.vue"

import { InlineNameAttribute } from "@/components_new/inline"

import Attributes from "./person/Attributes.vue"
import Activities from "./person/Activities.vue"
import Profiles from "./person/Profiles.vue"
import Relationships from "./person/Relationships.vue"
import Addresses from "./person/Addresses.vue"
import Workplaces from "./person/Workplaces.vue"
import Organizations from "./person/Organizations.vue"

import Notes from "@/components_new/notes/Notes.vue"
import MediaGroup from "@/components/media/MediaGroup.vue"

export default {
  name: "PersonView",
  created() {
    this.$store.dispatch("person/clear")
    this.$store.dispatch("person/fetch")
  },
  components: {
    InlineNameAttribute,
    Attributes,
    PrimaryPhoto,
    Activities,
    Profiles,
    Relationships,
    Addresses,
    Workplaces,
    Organizations,
    Notes,
    MediaGroup,
  },
}
</script>
