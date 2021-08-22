<template>
  <NewModal @close="cancel">
    <ModalForm
      :form-record="formRecord"
      :association="association"
      @save="save"
      @destroy="destroy"
      @cancel="cancel"
    >
      <FormField label="Activity*" :error="errors.activity">
        <ResourceSelect
          v-model="formRecord.activity"
          resource="activities"
          autofocus
        />
      </FormField>

      <FormField label="Role">
        <AppTextfield v-model="formRecord.role" />
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
    activity: null,
    role: null,
  },
  errors: {},
})

export default {
  name: "OrganizationActivityForm",
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
        activity: this.record.activity,
        role: this.record.role,
      }
    }
  },
  methods: {
    save() {
      this.errors = {}

      if (!this.formRecord.activity) {
        this.errors.activity = "is required"
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
