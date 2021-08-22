<template>
  <div class="source-card">
    <div class="source-card--left">
      <div class="source-card--reference-count">
        {{ source.referenceCount || 0 }}
      </div>
      <div style="font-size: 0.7rem">
        {{ counted("references", source.referenceCount) }}
      </div>
    </div>

    <div>
      <InternalLink :resource="source">
        <div :class="{ 'source-card--title': source.title, 'source-card--no-title': !source.title }">
          {{ source.title || 'Source has no title' }}
        </div>
      </InternalLink>

      <div class="source-card--details">
        <span v-if="source.service" class="source-card--service-icon">
          <ServiceIcon :service="source.service" />
        </span>
        <span>{{ source.host }}</span>
        <span v-if="source.author || source.username" style="margin-left: 40px">
          <span class="source-card--divider">|</span>
          <strong>{{ source.author || source.username }}</strong>
        </span>
        <span v-if="source.publishedAt" style="margin-left: 8px">
          ({{ publishedAt }})
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import counted from "@/lib/counted"
import dateHelper from "@/lib/date_helper"
import { ServiceIcon, InternalLink } from "@/components_new"

export default {
  name: "SourceCard",
  props: {
    source: {
      type: Object,
      required: true,
    },
  },
  computed: {
    publishedAt() {
      return dateHelper.formatDateString(this.source.publishedAt)
    },
  },
  methods: {
    counted,
  },
  components: {
    ServiceIcon,
    InternalLink,
  },
}
</script>

<style lang="scss" scoped>
.source-card {
  display: flex;
  margin: 3rem 0;
}
.source-card--left {
  color: $colors-light-grey;
  margin-right: 48px;
}
.source-card--reference-count {
  font-size: 1.75rem;
  line-height: 1.5rem;
  padding-top: 4px;
}
.source-card--title {
  font-weight: bold;
}
.source-card--no-title {
  font-style: italic;
  color: $colors-light-grey;
}
.source-card--no-title:hover {
  color: $colors-dark-grey;
}
.source-card--details {
  display: flex;
  align-items: center;
}
.source-card--service-icon {
  display: flex;
  margin-right: 8px;
}
.source-card--divider {
  padding-right: 8px;
  color: $colors-light-grey;
}
</style>
