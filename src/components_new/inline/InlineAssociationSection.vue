<template>
  <InlineSection
    :headline="headline"
    has-add-button
    @add="addRecord"
    @focus="hasFocus = arguments[0]"
  >
    <slot
      v-if="showForm"
      name="form"
      :record="record"
      :association="association"
      :events="{ save: saveRecord, destroy: destroyRecord, cancel: hideForm }"
    />

    <InlineAssociation
      :loaded="loaded"
      :error="error"
      :records="sortedRecords"
      :empty-state="`No ${association}`"
      :has-focus="hasFocus"
      :layout="layout"
      :compact="compact"
      :spacious="spacious"
      :disable-edit-function="disableEditFunction"
      @edit="editRecord"
    >
      <template #default="{ record }">
        <slot name="value" :record="record" />
      </template>
    </InlineAssociation>
  </InlineSection>
</template>

<script>
import { find } from "lodash"

import Api from "@/api"
import counted from "@/lib/counted"
import SourceHelper from "@/components/sources/SourceHelper"

import InlineSection from "./InlineSection.vue"
import InlineAssociation from "./InlineAssociation.vue"

export default {
  name: "InlineAssociationSection",
  props: {
    resource: {
      type: String,
      required: true,
    },
    association: {
      type: String,
      required: true,
    },
    sortFunction: {
      type: Function,
      default: records => { return records },
    },
    disableEditFunction: {
      type: Function,
      default: () => { return false },
    },
    compact: {
      type: Boolean,
      default: false,
    },
    spacious: {
      type: Boolean,
      default: false,
    },
    layout: {
      type: String,
      default: 'column',
    },
  },
  data() {
    return {
      showForm: false,
      hasFocus: false,
      record: null,
    }
  },
  created() {
    this.$store.dispatch(`${this.namespace}/fetch`)
  },
  computed: {
    headline() {
      const associationName = this.association === 'organizations' ? "groups" : this.association
      return [
        this.records.length,
        counted(associationName, this.records.length),
      ].join(" ")
    },
    namespace() {
      if (this.$store.state[this.resource][this.association]) {
        return `${this.resource}/${this.association}`
      } else {
        return this.association
      }
    },
    api() {
      if (Api(this.resource, this.association)) {
        return Api(this.resource, this.association)
      } else {
        return Api(this.association)
      }
    },
    state() {
      return (
        this.$store.state[this.resource][this.association] ||
        this.$store.state[this.association]
      )
    },
    loaded() {
      return this.state.loaded
    },
    error() {
      return this.state.error
    },
    records() {
      return this.state.all
    },
    sortedRecords() {
      return this.sortFunction(this.records)
    },
  },
  methods: {
    // Modal methods
    hideForm() {
      this.showForm = false
      this.record = null
    },
    addRecord() {
      this.record = null
      this.showForm = true
    },
    editRecord(record) {
      this.record = record
      this.showForm = true
    },
    // Store methods
    saveRecord(record) {
      if (record.sources) {
        record.sources = SourceHelper.prepareData(record.sources)
      }

      record.id
        ? this.updateRecord(record)
        : this.createRecord(record)

      this.hideForm()
    },
    createRecord(record) {
      return this.$store.dispatch("create", {
        namespace: this.namespace,
        api: this.api,
        record: record,
      })
    },
    updateRecord(record) {
      const backup = find(this.records, { id: record.id })
      return this.$store.dispatch("update", {
        namespace: this.namespace,
        api: this.api,
        record: record,
        backup: backup,
      })
    },
    destroyRecord(id) {
      const backup = find(this.records, { id: id })
      this.$store.dispatch("remove", {
        namespace: this.namespace,
        api: this.api,
        id: id,
        backup: backup,
      })

      this.hideForm()
    },
  },
  components: {
    InlineSection,
    InlineAssociation,
  },
}
</script>
