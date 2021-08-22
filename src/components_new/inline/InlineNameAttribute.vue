<template>
  <div
    @mouseenter="hasFocus = true"
    @mouseleave="hasFocus = false"
  >
    <NewModal :show="isEditing" @close="isEditing = false">
      <ModalForm title="Edit name" @save="save" @cancel="isEditing = false">
        <FormField label="Name*" :error="errors.name">
          <AppTextfield v-model="localValue" autofocus />
        </FormField>
      </ModalForm>
    </NewModal>

    <div class="inline-name-attribute">
      <InlineEditButton
        v-if="hasFocus"
        @click="isEditing = true"
        style="top: 23px; left: 4px;"
      />

      <div class="inline-name-attribute--text">
        <template v-if="state.loaded">
          {{ formattedValue }}
        </template>

        <div v-else-if="!state.loaded && !state.error" class="spinner"></div>

        <div v-else class="has-text-danger">
          Error {{ state.error.response.status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewModal from "@/components_new/NewModal.vue"
import ModalForm from "@/components_new/ModalForm.vue"
import FormField from "@/components_new/FormField.vue"
import AppTextfield from "@/components_new/AppTextfield.vue"
import InlineEditButton from "./InlineEditButton.vue"

export default {
  name: "InlineNameAttribute",
  data() {
    return {
      isEditing: false,
      localValue: "",
      hasFocus: false,
      errors: {},
    }
  },
  computed: {
    state() {
      return this.$store.state[this.resource][this.resource]
    },
    resource() {
      return this.$store.state.resource.singular
    },
    value() {
      return this.state.data.name
    },
    formattedValue() {
      return this.value || "No value"
    },
  },
  methods: {
    save() {
      this.errors = {}

      if (!this.localValue) {
        this.errors.name = "is required"
        return
      }

      const record = { name: this.localValue }
      this.$store.dispatch(`${this.resource}/update`, record)

      this.isEditing = false
    },
  },
  watch: {
    isEditing() {
      this.localValue = this.value
      this.errors = {}
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
.inline-name-attribute {
  display: inline-block;
  position: relative;
  padding-left: 32px;
  margin-left: -32px;
  margin-bottom: 3rem;
}
.inline-name-attribute--text {
  display: inline-block;
  font-size: 3rem;
  line-height: 3.75rem;
  font-weight: 900;
}
</style>
