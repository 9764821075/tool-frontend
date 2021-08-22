<template>
  <NewModal @close="cancel">
    <ModalForm
      :title="`Add ${singularResourceName}`"
      @save="save"
      @cancel="cancel"
    >
      <FormField label="Name*" :error="errors.name">
        <AppTextfield v-model="formRecord.name" autofocus />
      </FormField>
    </ModalForm>
  </NewModal>
</template>

<script>
import pluralize from "pluralize"

import {
  NewModal,
  ModalForm,
  FormField,
  AppTextfield,
} from "@/components_new"

const initialData = () => {
  return {
    formRecord: {
      resource: null,
      name: null,
    },
    errors: {},
  }
}

export default {
  name: "NewResourceModal",
  props: {
    resource: {
      type: String,
      required: true,
    },
  },
  data() {
    return initialData()
  },
  created() {
    this.formRecord.resource = this.resource
  },
  computed: {
    singularResourceName() {
      if (!this.resource) { return }
      const resourceName = pluralize.singular(this.resource)
      return resourceName == "organization" ? "group" : resourceName
    },
  },
  methods: {
    save() {
      this.errors = {}

      if (!this.formRecord.name) {
        this.errors.name = "is required"
        return
      }

      this.$emit("save", this.formRecord)
    },
    cancel() {
      this.$emit('cancel')
    },
  },
  components: {
      NewModal,
    ModalForm,
    FormField,
    AppTextfield,
  },
}
</script>
