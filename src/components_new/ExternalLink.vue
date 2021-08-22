<template>
  <a
    :href="computedUrl"
    rel="noopener noreferrer nofollow"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: "ExternalLink",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    computedUrl() {
      return `https://anon.to/?${this.url}`
    },
  },
}
</script>
