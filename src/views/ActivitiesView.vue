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
      <div
        v-for="group in groupedRecords"
        :key="group[0]"
      >
        <h2 class="title" v-if="group[0]">{{ group[0] }}</h2>

        <div
          v-for="record in group[1]"
          :key="record.id"
          class="card-container"
        >
          <ActivityCard :activity="record" />
        </div>
      </div>
    </template>

    <template v-slot:no-records>
      Looks like you didn’t add any activities yet.
    </template>
  </IndexPageLayout>
</template>

<script>
import { SearchIcon, UsersIcon } from "vue-feather-icons"

import { IndexPageLayout } from "@/views/layouts"
import { AppTextfield, ResourceSelect } from "@/components_new"
import ActivityCard from "./activity/Card.vue"

export default {
  name: "ActivityIndexPage",
  data() {
    return {
      resource: "activities",
      headline: "Activities",
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
    groupedRecords() {
      const result = []
      let lastYear = undefined

      this.records.forEach((record) => {
        const year = record.date.year || null

        if (year !== lastYear) {
          result.push([year, []])
        }

        lastYear = year
        result[result.length - 1][1].push(record)
      })
      return result
    },
  },
  components: {
    IndexPageLayout,
    AppTextfield,
    ResourceSelect,
    ActivityCard,
    SearchIcon,
    UsersIcon,
  },
}
</script>

<style scoped>
.title {
  font-weight: 400;
  margin: 3rem 0 !important;
}
.card-container {
  display: inline-block;
  width: 225px;
  vertical-align: top;
  margin: 0 16px 32px 0;
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
