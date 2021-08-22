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
      <FormField label="Name*" :error="errors.name">
        <AppTextfield v-model="formRecord.address.name" autofocus />
      </FormField>

      <FormField label="Address">
        <AppTextfield v-model="formRecord.address.line1" />
      </FormField>

      <FormField label="Zip code">
        <AppTextfield v-model="formRecord.address.zip_code" />
      </FormField>

      <FormField label="City">
        <AppTextfield v-model="formRecord.address.city" />
      </FormField>

      <FormField label="Country">
        <SearchSelect
          v-model="formRecord.address.country"
          :options="countryOptions"
          key-field="code"
          value-field="name"
        />
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

import { mapCountries } from "@/lib/mappings"
import countries from "@/lib/countries"

const initialData = () => ({
  formRecord: {
    id: null,
    address: {
      name: null,
      line1: null,
      zip_code: null,
      city: null,
      country: null,
    },
    since: null,
    until: null,
  },
  errors: {},
})

export default {
  name: "OrganizationAddressForm",
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
        address: this.record.address,
        since: this.record.since,
        until: this.record.until,
      }
    }
  },
  computed: {
    countryOptions() {
      return mapCountries(countries)
    },
  },
  methods: {
    save() {
      this.errors = {}

      if (!this.formRecord.address.name) {
        this.errors.name = "is required"
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
    SearchSelect,
  },
}
</script>
