<template>
  <div class="index-page">
    <div class="headline">
      <h1 class="headline-text">{{ headline }}</h1>
      <dl class="headline--stats">
        <dt class="headline--stats-label">All</dt>
        <dd class="headline--stats-info" style="width: 42px">
          <template v-if="Number.isInteger(allRecordCount)">
            {{ allRecordCount }}
          </template>
          <AppSpinner v-else :height="20" />
        </dd>
        <dt class="headline--stats-divider">|</dt>
        <dt class="headline--stats-label">Filtered</dt>
        <dd class="headline--stats-info">
          <template v-if="Number.isInteger(filteredRecordCount)">
            {{ filteredRecordCount }}
          </template>
          <AppSpinner v-else :height="20" />
        </dd>
      </dl>
    </div>

    <AppToolbar>
      <template v-slot:items>
        <slot name="toolbar" />
      </template>
      <template v-slot:add-button>
        <AppButton
          @click="showNewResourceModal = true"
          primary
        >
          Add {{ currentResourceName }}
        </AppButton>
      </template>
    </AppToolbar>

    <AppInfoMessage v-if="noRecords">
      <slot name="no-records" />
    </AppInfoMessage>

    <slot v-else name="records" />

    <AppInfoMessage v-if="Number.isInteger(filteredRecordCount) && filteredRecordCount === 0">
      <strong>No records</strong> matching the given search term and/or filters.
    </AppInfoMessage>

    <AppSpinner v-if="isLoading" />

    <NewResourceModal
      v-if="showNewResourceModal"
      :resource="resource"
      @save="createResource"
      @cancel="showNewResourceModal = false"
    />
  </div>
</template>

<script>
import { debounce } from "lodash"
import axios from "axios"

import {
  AppButton,
  AppSpinner,
  AppToolbar,
  AppInfoMessage,
  NewResourceModal,
} from "@/components_new"

export default {
  name: "IndexPageLayout",
  props: {
    resource: {
      type: String,
      required: true,
    },
    params: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      allRecordCount: null,
      filteredRecordCount: null,
      noRecords: false,
      isInitialLoad: true,
      isLoading: false,
      allLoaded: false,
      offset: 100,
      showNewResourceModal: false,
    }
  },
  created() {
    this.loadMore()
    this.filter = debounce(this.filter, 250)
  },
  mounted() {
    this.addScrollListener()
  },
  beforeDestroy() {
    this.removeScrollListener()
  },
  computed: {
    canRequest() {
      return !this.noRecords && !this.allLoaded
    },
    currentResourceName() {
      const resourceName = this.$store.state.resource.singular
      return resourceName === "organization" ? "group" : resourceName
    },
  },
  methods: {
    addScrollListener() {
      document.addEventListener("scroll", this.loadMoreWhenScrolledToBottom)
    },
    removeScrollListener() {
      document.removeEventListener("scroll", this.loadMoreWhenScrolledToBottom)
    },
    loadMoreWhenScrolledToBottom() {
      if (!this.canRequest) { return }

      if ((document.documentElement.scrollTop + window.innerHeight + this.offset) >= document.documentElement.scrollHeight) {
        this.loadMore()
      }
    },
    loadMore() {
      if (!this.canRequest || this.isLoading) { return }

      this.isLoading = true

      const params = `page=${this.page}&${this.params}`

      return axios
        .get(`/${this.resource}?${params}`)
        .then(response => {
          this.allRecordCount = response.data.allRecordCount
          this.filteredRecordCount = response.data.filteredRecordCount

          if (!response.data.allRecordCount) {
            this.noRecords = true
            return
          }

          if (!response.data.records.length) {
            this.allLoaded = true
            return
          }

          this.page += 1
          this.$emit("add-records", response.data.records)
        })
        .finally(() => {
          this.isInitialLoad = false
          this.isLoading = false
        })
    },
    filter() {
      this.allLoaded = false
      if (!this.canRequest) { return }

      this.page = 1
      this.isLoading = true

      const params = `page=${this.page}&${this.params}`

      return axios
        .get(`/${this.resource}?${params}`)
        .then(response => {
          this.allRecordCount = response.data.allRecordCount
          this.filteredRecordCount = response.data.filteredRecordCount

          this.page += 1
          this.$emit("set-records", response.data.records)
        })
        .finally(() => {
          this.isInitialLoad = false
          this.isLoading = false
        })
    },
    createResource(record) {
      axios.post(`/${this.resource}`, record)
           .then(response => { this.$router.push(`/${record.resource}/${response.data.id}`) })
    },
  },
  components: {
    AppSpinner,
    AppButton,
    AppToolbar,
    AppInfoMessage,
    NewResourceModal,
  },
  watch: {
    params() {
      this.filter()
    },
  },
}
</script>

<style lang="scss" scoped>
.index-page {
  margin: 2.5rem 5rem 2.5rem 10rem;
  width: 100%;
}
.headline {
  display: flex;
  align-items: flex-end;
  margin-bottom: 16px;
}
.headline-text {
  font-weight: 900;
  font-size: 3rem;
}
.headline--stats {
  display: flex;
  font-size: .85rem;
  font-style: italic;
  margin: 0 0 4px 32px;
}
.headline--stats-divider {
  display: inline-block;
  padding: 0 8px 0 16px;
  height: 26px;
}
.headline--stats-label {
  font-weight: bold;
  margin-right: 8px;
}
.headline--stats-label::after {
  content: ':';
}
.headline--stats-info {
  margin-inline-start: 0;
}
</style>
