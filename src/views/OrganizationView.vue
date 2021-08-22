<template>
  <div id="view" class="container">
    <div class="columns">
      <div class="column is-one-quarter">
        <Logo />
        <Activities />
      </div>

      <div class="column">
        <div style="margin-left: 4rem;">
          <InlineNameAttribute />

          <div class="columns" style="margin-bottom: 0;">
            <div class="column" style="padding-bottom: 0; margin-right: 1rem;">
              <Attributes />
              <Addresses />
            </div>

            <div class="column" style="padding-bottom: 0; margin-left: 1rem;">
              <Profiles />
            </div>
          </div>

          <Members />
          <Notes />

          <MediaGroup type="photos" filetypes=".jpg, .png" orientation="landscape" :tagging="true" />
          <MediaGroup type="screenshots" filetypes=".jpg, .png" orientation="landscape" />
          <MediaGroup type="pdfs" filetypes=".pdf" orientation="portrait" />
        </div>
      </div>
    </div>

    <venobox-gallery />
  </div>
</template>

<script>
import InlineNameAttribute from "@/components_new/inline/InlineNameAttribute.vue"

import Logo from "./organization/Logo.vue"
import Attributes from "./organization/Attributes.vue"
import Activities from "./organization/Activities.vue"
import Profiles from "./organization/Profiles.vue"
import Addresses from "./organization/Addresses.vue"
import Members from "./organization/Members.vue"

import Notes from "@/components_new/notes/Notes.vue"
import MediaGroup from "@/components/media/MediaGroup.vue"

export default {
  name: "OrganizationView",
  created() {
    this.$store.dispatch("organization/clear")
    this.$store.dispatch("organization/fetch")
  },
  components: {
    InlineNameAttribute,
    Logo,
    Attributes,
    Activities,
    Profiles,
    Addresses,
    Members,
    Notes,
    MediaGroup,
  },
}
</script>
