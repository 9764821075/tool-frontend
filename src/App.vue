<template>
  <div class="app">
    <Navigation />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Navigation from "@/components_new/Navigation";

export default {
  name: "App",
  components: {
    Navigation,
  }
};
</script>

<style scoped>
.app {
  display: flex;
  min-height: 100%;
}
</style>
