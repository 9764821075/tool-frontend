<template>
  <div class="profile">
    <ServiceIcon
      :service="record.service"
      class="profile--icon"
    />
    <ExternalLink :url="url">
      {{ record.username }}
    </ExternalLink>
  </div>
</template>

<script>
import { ServiceIcon, ExternalLink } from "@/components_new"
import services from "@/lib/services"

export default {
  name: "PersonProfileValue",
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  computed: {
    url() {
      const url = services[this.record.service].url
      return url.replace("%{username}", this.record.username)
    },
  },
  components: {
    ServiceIcon,
    ExternalLink,
  },
}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  align-items: center;
}
.profile--icon {
  margin-right: 6px;
}
</style>
