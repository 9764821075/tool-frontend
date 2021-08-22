<template>
  <NewModal @close="cancel">
    <ModalForm
      :form-record="formRecord"
      :association="association"
      @save="save"
      @destroy="destroy"
      @cancel="cancel"
    >
      <FormField label="Title" :error="errors.title">
        <AppTextfield v-model="formRecord.title" autofocus />
      </FormField>

      <FormField label="Date" :error="errors.date">
        <AppTextfield v-model="formRecord.date" />
      </FormField>

      <FormField
        label="Note"
        hint="This note will be formatted using Markdown"
        :error="errors.text"
      >
        <AppTextarea v-model="formRecord.text" rows="12" />
      </FormField>
    </ModalForm>
  </NewModal>
</template>

<script>
import NewModal from "@/components_new/NewModal.vue"
import ModalForm from "@/components_new/ModalForm.vue"
import FormField from "@/components_new/FormField.vue"
import AppTextarea from "@/components_new/AppTextarea.vue"
import AppTextfield from "@/components_new/AppTextfield.vue"

const initialData = () => ({
  formRecord: {
    id: null,
    title: null,
    date: null,
    text: null,
  },
  errors: {},
})

export default {
  name: "NoteForm",
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
        title: this.record.title,
        date: this.record.date,
        text: this.record.text,
      }
    }
  },
  methods: {
    save() {
      this.errors = {}

      if (!this.formRecord.title && !this.formRecord.text) {
        this.errors.title = "title or text required"
        this.errors.text = "title or text required"
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
  },
}
</script>
