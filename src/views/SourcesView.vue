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
      <div class="toolbar--order-by">
        <div class="toolbar--order-by--icon">
          <BarChartIcon size="1x" />
        </div>
        <RadioButtons
          v-model="orderBy"
          :options="orderByOptions"
          label="Order by"
          class="toolbar--order-by--input"
        />
      </div>
    </template>

    <template v-slot:records>
      <SourceCard
        v-for="record in records"
        :key="record.id"
        :source="record"
      />
    </template>

    <template v-slot:no-records>
      Looks like you didn’t add any sources yet.
    </template>
  </IndexPageLayout>
</template>

<script>
import { SearchIcon, BarChartIcon } from "vue-feather-icons"

import { IndexPageLayout } from "@/views/layouts"
import { AppTextfield, SearchSelect, RadioButtons } from "@/components_new"
import SourceCard from "./source/Card.vue"

export default {
  name: "SourceIndexPage",
  data() {
    return {
      resource: "sources",
      headline: "Sources",
      query: null,
      orderBy: { key: 'references', value: 'References' },
      orderByOptions: [
        { key: 'references', value: 'References' },
        { key: 'date', value: 'Date' },
      ],
      records: [],
    }
  },
  computed: {
    params() {
      const params = new URLSearchParams()
      if (this.query) { params.append('query', this.query) }
      if (this.orderBy) { params.append('orderBy', this.orderBy.key) }
      return params.toString()
    },
  },
  components: {
    IndexPageLayout,
    AppTextfield,
    SearchSelect,
    RadioButtons,
    SourceCard,
    SearchIcon,
    BarChartIcon,
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
.toolbar--order-by {
  display: flex;
  align-items: center;
  width: 280px;
}
.toolbar--order-by--icon {
  margin-left: 2rem;
  margin-right: 8px;
}
.toolbar--order-by--input {
  padding: 5px 0;
}
</style>
