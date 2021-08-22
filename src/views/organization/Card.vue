<template>
  <div class="organization-card">
    <div
      class="organization-card-image"
      :style="{ marginLeft: `${nestingLevel * (50 - (5 * nestingLevel))}px` }"
    >
      <InternalLink :resource="organization">
        <AppImage
          :src="organization.primaryPhotoSrc || ''"
          :width="`${32 - (5 * nestingLevel)}px`"
          :height="`${32 - (5 * nestingLevel)}px`"
          size="1x"
        >
          <template v-slot:icon>
            <UsersIcon size="1x" />
          </template>
        </AppImage>
      </InternalLink>
    </div>

    <InternalLink
      :resource="organization"
      :style="{ fontSize: `${1 - 0.1 * nestingLevel}rem` }"
      class="organization-card-link"
     />
  </div>
</template>

<script>
import { UsersIcon } from "vue-feather-icons"
import { AppImage, InternalLink } from "@/components_new"

export default {
  name: "OrganizationCard",
  props: {
    organization: {
      type: Object,
      required: true,
    },
  },
  computed: {
    nestingLevel() {
      if (!this.organization.ancestry) { return 0 }
      return this.organization.ancestry.split("/").length
    },
  },
  components: {
    UsersIcon,
    AppImage,
    InternalLink,
  },
}
</script>

<style scoped>
.organization-card {
  margin-bottom: 8px;
}
.organization-card-image {
  display: inline-block;
  vertical-align: top;
  margin-right: 12px;
}
.organization-card-link {
  display: inline-block;
  padding-top: .45rem;
}
</style>
