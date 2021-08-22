<template>
  <div class="person-card">
    <InternalLink :resource="person">
      <AppImage
        :src="person.primaryPhotoSrc || ''"
        width="175px"
        height="220px"
      >
        <template v-slot:icon>
          <UserIcon size="2x" />
        </template>
      </AppImage>
    </InternalLink>

    <div class="person-card--content">
      <InternalLink :resource="person" class="person-card--link" />

      <ol class="person-card--organizations">
        <li
          v-for="organization in person.organizations"
          :key="organization.id"
          class="person-card--organizations--item"
        >
          <InternalLink :resource="organization" class="person-card--organizations--link" />
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { UserIcon } from "vue-feather-icons"
import { AppImage, InternalLink } from "@/components_new"

export default {
  name: "PersonCard",
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  components: {
    UserIcon,
    AppImage,
    InternalLink,
  },
}
</script>

<style lang="scss" scoped>
.person-card--link {
  word-break: break-word;
}
.person-card--content {
  margin-top: 6px;
}
.person-card--organizations {
  list-style: none;
  margin-top: 4px;
}
.person-card--organizations--item {
  line-height: 1.1rem;
}
.person-card--organizations--link {
  color: $colors-light-grey;
  font-size: .8rem;
}
.person-card--organizations--link:hover {
  color: $colors-dark-grey;
}
</style>
