<template>
  <IndexPageLayout
    :resource="resource"
    :headline="headline"
    :params="params"
    @set-records="records = arguments[0]"
    @add-records="records.push(...arguments[0])"
  >
    <template v-slot:toolbar>
      <div class="toolbar--search">
        <div class="toolbar--search--icon">
          <SearchIcon size="1x" />
        </div>
        <AppTextfield
          v-model="query"
          autofocus
          rounded
          placeholder="Search"
          name="query"
        />
      </div>
    </template>

    <template v-slot:records>
      <GroupCard
        v-for="record in records"
        :key="record.id"
        :organization="record"
      />
    </template>

    <template v-slot:no-records>
      Looks like you didn’t add any organizations yet.
    </template>
  </IndexPageLayout>
</template>

<script>
import { SearchIcon } from "vue-feather-icons"

import { IndexPageLayout } from "@/views/layouts"
import { AppTextfield } from "@/components_new"
import GroupCard from "./organization/Card.vue"

export default {
  name: "GroupIndexPage",
  data() {
    return {
      resource: "organizations",
      headline: "Groups",
      query: null,
      records: [],
    }
  },
  computed: {
    params() {
      const params = new URLSearchParams()
      if (this.query) { params.append('query', this.query) }
      return params.toString()
    },
  },
  components: {
    IndexPageLayout,
    AppTextfield,
    GroupCard,
    SearchIcon,
  },
}
</script>

<style scoped>
.toolbar--search {
  display: flex;
  align-items: center;
  width: 380px;
}
.toolbar--search--icon {
  margin-right: 8px;
}
</style>
