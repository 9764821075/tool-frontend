<template>
  <div>
    <NewModal :show="isEditing" @close="isEditing = false">
      <ModalForm :title="`Edit ${label.toLowerCase()}`" @save="save" @cancel="isEditing = false">
        <FormField :label="label" :hint="hint">
          <AppTextfield v-model="localValue" autofocus />
        </FormField>
      </ModalForm>
    </NewModal>

    <div class="inline-url-attribute">
      <InlineEditButton
        v-if="editable"
        @click="isEditing = true"
      />

      <dl class="inline-url-attribute--container">
        <dt class="inline-url-attribute--key">{{ label }}</dt>
        <dd class="inline-url-attribute--value">
          <template v-if="state.loaded">
            <template v-if="formattedValue">
              <a :href="formattedValue">{{ formattedValue }}</a>
            </template>
            <span v-else class="light-grey-color">unknown</span>
          </template>

          <div v-else-if="!state.loaded && !state.error" class="spinner"></div>

          <div v-else class="has-text-danger">
            Error {{ state.error.response.status }}
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import NewModal from "@/components_new/NewModal.vue"
import ModalForm from "@/components_new/ModalForm.vue"
import FormField from "@/components_new/FormField.vue"
import AppTextfield from "@/components_new/AppTextfield.vue"
import InlineEditButton from "@/components_new/inline/InlineEditButton.vue"

export default {
  name: "InlineUrlAttribute",
  data() {
    return {
      isEditing: false,
      localValue: "",
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    hint: {
      type: String,
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
      return this.value
    },
  },
  methods: {
    save() {
      const data = { [this.name]: this.localValue }
      this.$store.dispatch(`${this.resource}/update`, data)
      this.isEditing = false
    },
  },
  watch: {
    isEditing() {
      this.localValue = this.value
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
.inline-url-attribute {
  position: relative;
}
.inline-url-attribute--container {
  display: flex;
}
.inline-url-attribute--key {
  flex-shrink: 0;
  width: 120px;
}
.inline-url-attribute--key::after {
  content: ":";
}
.inline-url-attribute--value {
  overflow-wrap: anywhere;
  padding: 1px 0;
}
</style>
