<template>
  <NewModal @close="cancel">
    <ModalForm
      :form-record="formRecord"
      :association="association"
      @save="save"
      @destroy="destroy"
      @cancel="cancel"
    >
      <FormField label="Person*" :error="errors.person">
        <ResourceSelect
          v-model="formRecord.person"
          resource="people"
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
    person: null,
    position: null,
  },
  errors: {},
})

export default {
  name: "OrganizationMemberForm",
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
        position: this.record.position,
      }
    }
  },
  methods: {
    save() {
      this.errors = {}

      if (!this.formRecord.person) {
        this.errors.person = "is required"
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
