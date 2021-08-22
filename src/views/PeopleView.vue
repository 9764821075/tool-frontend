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
      <div class="toolbar--filter-groups">
        <div class="toolbar--filter-groups--icon">
          <UsersIcon size="1x" />
        </div>
        <ResourceSelect
          v-model="filterByGroup"
          resource="organizations"
          placeholder="Filter by group"
          rounded
        />
      </div>
    </template>

    <template v-slot:records>
      <ol class="person-list">
        <li
          v-for="record in records"
          :key="record.id"
          class="person-list-item"
        >
          <PersonCard :person="record" />
        </li>
      </ol>
    </template>

    <template v-slot:no-records>
      Looks like you didn’t add any people yet.
    </template>
  </IndexPageLayout>
</template>

<script>
import { SearchIcon, UsersIcon } from "vue-feather-icons"

import { IndexPageLayout } from "@/views/layouts"
import { AppTextfield, ResourceSelect } from "@/components_new"
import PersonCard from "./person/Card.vue"

export default {
  name: "PersonIndexPage",
  data() {
    return {
      resource: "people",
      headline: "People",
      query: null,
      filterByGroup: null,
      records: [],
    }
  },
  computed: {
    params() {
      const params = new URLSearchParams()
      if (this.query) { params.append('query', this.query) }
      if (this.filterByGroup) { params.append('group', this.filterByGroup.id) }
      return params.toString()
    },
  },
  components: {
    IndexPageLayout,
    AppTextfield,
    ResourceSelect,
    PersonCard,
    SearchIcon,
    UsersIcon,
  },
}
</script>

<style scoped>
.person-list {
  list-style: none;
  display: block;
  margin: 0;
  padding: 0;
}
.person-list-item {
  width: 170px;
  display: inline-block;
  vertical-align: top;
  margin: 0 1.5rem 2rem 0;
}

.toolbar--search {
  display: flex;
  align-items: center;
  width: 380px;
}
.toolbar--search--icon {
  margin-right: 8px;
}
.toolbar--filter-groups {
  display: flex;
  align-items: center;
  width: 300px;
}
.toolbar--filter-groups--icon {
  margin-left: 2rem;
  margin-right: 8px;
}
</style>
