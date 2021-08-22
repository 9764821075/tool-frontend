<template>
  <div>
    <NewModal :show="isEditing" @close="isEditing = false">
      <ModalForm title="Edit date" @save="save" @cancel="isEditing = false">
        <div class="inline-date-attribute--field-group">
          <FormField label="Day" class="inline-date-attribute--field">
            <AppTextfield v-model="day" autofocus />
          </FormField>

          <FormField label="Month" class="inline-date-attribute--field">
            <AppTextfield v-model="month" />
          </FormField>

          <FormField label="Year" class="inline-date-attribute--field">
            <AppTextfield v-model="year" />
          </FormField>
        </div>

        <div class="small-font light-grey-color">
          <b>Date should be defined as</b>:
          <ul>
            <li>only year</li>
            <li>only month and year</li>
            <li>day, month and year</li>
          </ul>
        </div>
      </ModalForm>
    </NewModal>

    <div class="inline-date-attribute">
      <InlineEditButton
        v-if="editable"
        @click="isEditing = true"
      />

      <dl class="inline-date-attribute--container">
        <dt class="inline-date-attribute--key">Date</dt>
        <dd class="inline-date-attribute--value">
          <template v-if="state.loaded">
            <span v-if="formattedValue">{{ formattedValue }}</span>
            <span v-else class="light-grey-color">unknown</span>
          </template>

          <div v-else-if="!state.loaded && !state.error" class="spinner"></div>

          <div v-else class="error-color">
            Error {{ state.error.response.status }}
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import dateHelper from "@/lib/date_helper"

import NewModal from "@/components_new/NewModal.vue"
import ModalForm from "@/components_new/ModalForm.vue"
import FormField from "@/components_new/FormField.vue"
import AppTextfield from "@/components_new/AppTextfield.vue"
import InlineEditButton from "@/components_new/inline/InlineEditButton.vue"

export default {
  name: "InlineDateAttribute",
  data() {
    return {
      day: null,
      month: null,
      year: null,
      isEditing: false,
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    state() {
      return this.$store.state[this.resource][this.resource]
    },
    resource() {
      return this.$store.state.resource.singular
    },
    value() {
      return this.state.data[this.name]
    },
    formattedValue() {
      if (!this.value) { return }
      return dateHelper.formatDateObject(this.value)
    },
  },
  methods: {
    save() {
      const data = {
        date: {
          day: this.day,
          month: this.month,
          year: this.year,
        },
      }
      this.$store.dispatch(`${this.resource}/update`, data)
      this.isEditing = false
    },
  },
  watch: {
    isEditing() {
      this.day = dateHelper.padNumber(this.value.day)
      this.month = dateHelper.padNumber(this.value.month)
      this.year = this.value.year
    },
  },
  components: {
    NewModal,
    ModalForm,
    FormField,
    AppTextfield,
    InlineEditButton,
  },
}
</script>

<style lang="scss" scoped>
.inline-date-attribute--field-group {
  display: flex;
  align-items: flex-end;
}
.inline-date-attribute--field {
  margin-right: 12px;
}
.inline-date-attribute--field:last-child {
  margin-right: 0;
}
.inline-date-attribute {
  position: relative;
}
.inline-date-attribute--container {
  display: flex;
}
.inline-date-attribute--key {
  width: 120px;
}
.inline-date-attribute--key::after {
  content: ":";
}
.inline-date-attribute--value {
  padding: 1px 0;
}
</style>
