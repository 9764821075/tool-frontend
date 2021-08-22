<template>
  <NewModal wide @close="cancel">
    <ModalForm
      :form-record="formRecord"
      :association="association"
      has-since-until
      @save="save"
      @destroy="destroy"
      @cancel="cancel"
    >
      <FormField label="Group*" :error="errors.organization">
        <ResourceSelect
          v-model="formRecord.organization"
          resource="organizations"
          autofocus
        />
      </FormField>

      <FormField label="Position">
        <AppTextfield v-model="formRecord.position" />
      </FormField>
    </ModalForm>
  </NewModal>
</template>

<script>
import {
  NewModal,
  ModalForm,
  FormField,
  AppTextfield,
  ResourceSelect,
} from "@/components_new"

const initialData = () => ({
  formRecord: {
    organization: null,
    position: null,
    since: null,
    until: null,
  },
  errors: {},
})

export default {
  name: "PersonOrganizationForm",
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
        organization: this.record.organization,
        position: this.record.position,
        since: this.record.since,
        until: this.record.until,
      }
    }
  },
  methods: {
    save() {
      this.errors = {}

      if (!this.formRecord.organization) {
        this.errors.organization = "is required"
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
    AppTextfield,
    ResourceSelect,
  },
}
</script>
