<template>
  <div class="toolbar">
    <div class="toolbar--items">
      <slot name="items" />
    </div>
    <div class="toolbar--add-button">
      <slot name="add-button" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppToolbar",
}
</script>

<style scoped>
.toolbar {
  display: flex;
  margin-bottom: 72px;
}
.toolbar--items {
  display: flex;
  min-width: 150px;
}
.toolbar--add-button {
  margin-left: auto;
  margin-right: 7rem;
}
</style>
