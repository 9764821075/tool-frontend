<template>
  <NewModal @close="cancel">
    <ModalForm
      :form-record="formRecord"
      :association="association"
      @save="save"
      @destroy="destroy"
      @cancel="cancel"
    >
      <FormField label="Service*" :error="errors.service">
        <SearchSelect
          v-model="serviceOption"
          :options="serviceOptions"
          autofocus
        />
      </FormField>

      <FormField label="Username*" :error="errors.username">
        <AppTextfield v-model="formRecord.username" />
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
  SearchSelect,
} from "@/components_new"

import { mapServices } from "@/lib/mappings"
import services from "@/lib/services"

const initialData = () => ({
  formRecord: {
    id: null,
    service: null,
    username: null,
  },
  serviceOption: null,
  errors: {},
})

export default {
  name: "PersonProfileForm",
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
        service: this.record.service,
        username: this.record.username,
      }

      if (this.record.service) {
        this.serviceOption = {
          key: this.record.service,
          value: services[this.record.service].name,
        }
      }
    }
  },
  computed: {
    serviceOptions() {
      return mapServices(services)
    },
  },
  methods: {
    save() {
      this.errors = {}

      if (!this.serviceOption) {
        this.errors.service = "is required"
      }
      if (!this.formRecord.username) {
        this.errors.username = "is required"
      }
      if (Object.keys(this.errors).length) { return }

      const record = { ...this.formRecord }
      record.service = this.serviceOption.key

      this.events.save(record)
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
    SearchSelect,
  },
}
</script>
