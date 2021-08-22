<template>
  <div class="app-info-message">
    <div class="app-info-message--icon">
      <InfoIcon size="1x" />
    </div>
    <div class="app-info-message--text">
      <slot />
    </div>
  </div>
</template>

<script>
import { InfoIcon } from "vue-feather-icons"

export default {
  name: "AppInfoMessage",
  components: {
    InfoIcon,
  },
}
</script>

<style scoped>
.app-info-message {
  display: flex;
  align-items: center;
}
.app-info-message--icon {
  display: flex;
}
.app-info-message--text {
  padding: 1rem;
}
</style>
