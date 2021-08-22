<template>
  <div id="view" class="container">
    <div class="columns">
      <div class="column is-one-quarter">
        <PrimaryPhoto orientation="landscape" />

        <PhotoTags />
        <Participants />
      </div>

      <div class="column">
        <div style="margin-left: 4rem;">
          <InlineNameAttribute />

          <div class="columns" style="margin-bottom: 0;">
            <div class="column" style="padding-bottom: 0; margin-right: 1rem;">
              <Attributes />
            </div>

            <div class="column" style="padding-bottom: 0; margin-left: 1rem;">
              <Organizations />
            </div>
          </div>

          <Notes />

          <MediaGroup type="photos" filetypes=".jpg, .png" orientation="landscape" :tagging="true" :enable-primary-photo-button="true" />
          <MediaGroup type="screenshots" filetypes=".jpg, .png" orientation="landscape" />
          <MediaGroup type="videos" filetypes=".mp4" orientation="landscape" />
        </div>
      </div>
    </div>

    <venobox-gallery />
  </div>
</template>

<script>
import PrimaryPhoto from "@/components/PrimaryPhoto.vue"

import InlineNameAttribute from "@/components_new/inline/InlineNameAttribute.vue"

import Attributes from "./activity/Attributes.vue"
import PhotoTags from "./activity/PhotoTags.vue"
import Participants from "./activity/Participants.vue"
import Organizations from "./activity/Organizations.vue"

import Notes from "@/components_new/notes/Notes.vue"
import MediaGroup from "@/components/media/MediaGroup.vue"

export default {
  name: "ActivityView",
  created() {
    this.$store.dispatch("activity/clear")
    this.$store.dispatch("activity/fetch")
  },
  components: {
    InlineNameAttribute,
    Attributes,
    PrimaryPhoto,
    PhotoTags,
    Participants,
    Organizations,
    Notes,
    MediaGroup,
  },
}
</script>
