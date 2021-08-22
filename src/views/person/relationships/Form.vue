<template>
  <NewModal @close="cancel">
    <ModalForm
      :form-record="formRecord"
      :association="association"
      @save="save"
      @destroy="destroy"
      @cancel="cancel"
    >
      <FormField
        v-if="showFriendField"
        label="Person*"
        :error="errors.friend"
      >
        <ResourceSelect
          v-model="formRecord.friend"
          resource="people"
          autofocus
        />
      </FormField>

      <FormField
        v-else
        label="Person*"
        :error="errors.person"
      >
        <ResourceSelect
          v-model="formRecord.person"
          resource="people"
          autofocus
        />
      </FormField>

      <FormField label="Status*" :error="errors.status">
        <SearchSelect
          v-model="formRecord.status"
          :options="relationshipOptions"
        />
      </FormField>

      <FormField label="Info">
        <AppTextarea v-model="formRecord.info" rows="6" />
      </FormField>
    </ModalForm>
  </NewModal>
</template>

<script>
import {
  NewModal,
  ModalForm,
  FormField,
  AppTextarea,
  AppTextfield,
  SearchSelect,
  ResourceSelect,
} from "@/components_new"

import { mapRelationships } from "@/lib/mappings"
import relationshipStatuses from "@/lib/relationship_statuses"

const initialData = () => ({
  formRecord: {
    person: null,
    friend: null,
    status: null,
  },
  errors: {},
})

export default {
  name: "PersonRelationshipForm",
  props: {
    record: {
      type: Object,
      default: null,
    },
    association: {
      type: String,
      required: true,
    },
    events: {
      type: Object,
      required: true,
    },
  },
  data() {
    return initialData()
  },
  created() {
    if (this.record) {
      this.formRecord = {
        id: this.record.id,
        person: this.record.person,
        friend: this.record.friend,
        status: {
          key: this.record.status,
          value: relationshipStatuses[this.record.status],
        },
        info: this.record.info,
      }
    }
  },
  computed: {
    currentResourceId() {
      return this.$store.state.resource.id
    },
    showFriendField() {
      if (!this.record) { return true }
      return !this.record.id || this.otherPersonIsFriend
    },
    otherPersonIsFriend() {
      return this.record.person && this.record.person.id == this.currentResourceId
    },
    relationshipOptions() {
      return mapRelationships(relationshipStatuses)
    },
  },
  methods: {
    save() {
      this.errors = {}

      if (this.showFriendField && !this.formRecord.friend) {
        this.errors.friend = "is required"
      }
      if (!this.showFriendField && !this.formRecord.person) {
        this.errors.person = "is required"
      }
      if (!this.formRecord.status) {
        this.errors.status = "is required"
      }
      if (Object.keys(this.errors).length > 0) {
        return
      }

      this.events.save(this.formRecord)
    },
    destroy() {
      this.events.destroy(this.formRecord.id)
    },
    cancel() {
      this.events.cancel()
    },
  },
  components: {
    NewModal,
    ModalForm,
    FormField,
    AppTextarea,
    AppTextfield,
    SearchSelect,
    ResourceSelect,
  },
}
</script>
