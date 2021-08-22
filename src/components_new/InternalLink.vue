<template>
  <router-link :to="url">
    <slot>{{ value }}</slot>
  </router-link>
</template>

<script>
export default {
  name: "InternalLink",
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    url() {
      if (!this.resource.resource) {
        console.error("Missing resource prop for record", this.resource)
        throw new Error("InternalLink: Missing resource prop for record")
      }

      if (this.resource.id) {
        return `/${this.resource.resource}/${this.resource.id}`
      }
      return `/${this.resource.resource}`
    },
    value() {
      return this.resource.name
    },
  },
}
</script>
