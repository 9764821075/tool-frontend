<template>
  <div>
    <InternalLink :resource="activity">
      <AppImage
        :src="activity.primaryPhotoSrc"
        width="215px"
        height="120px"
      >
        <template v-slot:icon>
          <ActivityIcon size="2x" />
        </template>
      </AppImage>
    </InternalLink>

    <div class="card--content">
      <div>
        <div
          v-if="hasDate || formattedLocation"
          class="card--content--subline"
        >
          {{ formattedDate }}
          <span v-if="hasDate && formattedLocation" style="margin: 0 2px">&middot;</span>
          {{ formattedLocation }}
        </div>
        <InternalLink :resource="activity" />
      </div>
    </div>
  </div>
</template>

<script>
import { compact } from "lodash"
import { ActivityIcon } from "vue-feather-icons"
import { AppImage, InternalLink } from "@/components_new"
import dateHelper from "@/lib/date_helper"

export default {
  name: "ActivityCard",
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedLocation() {
      return compact([
        this.activity.location.city,
        this.activity.location.name,
      ]).join(", ")
    },
    hasDate() {
      return (
        this.activity.date.year ||
        this.activity.date.month ||
        this.activity.date.day
      )
    },
    formattedDate() {
      return dateHelper.formatDateObject(this.activity.date)
    },
  },
  components: {
    ActivityIcon,
    AppImage,
    InternalLink,
  },
}
</script>

<style lang="scss" scoped>
.card--content {
  padding-top: 4px;
}
.card--content--subline {
  color: $colors-light-grey;
  font-size: .8rem;
  margin-bottom: 4px;
}
</style>
