<template>
  <div style="width: 125px">
    <AppImage
      :src="record.person.image"
      width="125px"
      height="150px"
      class="media-item--image"
    />
    <InternalLink :resource="record.person" />
    <div v-if="record.position" class="small-font light-grey-color">
      {{ record.position }}
    </div>
  </div>
</template>

<script>
import { AppImage, InternalLink } from "@/components_new"

export default {
  name: "OrganizationMemberValue",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  components: {
    AppImage,
    InternalLink,
  },
}
</script>
