<template>
  <div class="modal-form">
    <div class="modal-form--left" :class="{ wide }">
      <h1 class="modal-form--headline">{{ title || recordTitle }}</h1>

      <form @submit.prevent="$emit('save')">
        <slot />

        <div class="modal-form--button-group">
          <div class="modal-form--button save-button">
            <AppButton type="submit" primary>Save</AppButton>
          </div>
          <div class="modal-form--button cancel-button">
            <AppButton @click="$emit('cancel')">Cancel</AppButton>
          </div>

          <div v-if="isEditMode" class="modal-form--button destroy-button">
            <AppButton dangerous @click="$emit('destroy')">Delete</AppButton>
          </div>
        </div>
      </form>
    </div>

    <div
      v-if="hasSinceUntil || hasSources"
      class="modal-form--right"
    >
      <div class="modal-form--addon">
        <SinceUntil :form-record="formRecord" @save="Object.assign(formRecord, arguments[0])" />
      </div>
    </div>
  </div>
</template>

<script>
import pluralize from "pluralize"
import AppButton from "@/components_new/AppButton.vue"
import SinceUntil from "@/components_new/SinceUntil.vue"
import Sources from "@/components_new/Sources.vue"

export default {
  name: "ModalForm",
  props: {
    title: {
      type: String,
    },
    wide: {
      type: Boolean,
      default: false,
    },
    formRecord: {
      type: Object,
    },
    association: {
      type: String,
    },
    hasSinceUntil: {
      type: Boolean,
      default: false,
    },
    hasSources: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isEditMode() {
      return this.formRecord && this.formRecord.id
    },
    recordTitle() {
      let name = pluralize.singular(this.association)
      if (name === "organization") { name = "group" }
      return this.isEditMode ? `Edit ${name}` : `Add ${name}`
    },
  },
  components: {
    AppButton,
    SinceUntil,
    Sources,
  },
}
</script>

<style scoped>
.modal-form {
  display: flex;
  padding: 30px 40px;
}

.modal-form--left {
   width: 320px;
}
.modal-form--left.wide {
  width: 720px;
}
.modal-form--headline {
  margin-bottom: 2rem;
  font-size: revert;
  font-weight: revert;
}
.modal-form--button-group {
  display: flex;
  margin-top: 2rem;
}
.modal-form--button.save-button {
  margin-right: 4px;
}
.modal-form--button.destroy-button {
  margin-left: auto;
}

.modal-form--right {
  border-left: 1px solid #f2f2f2;
  margin-left: 40px;
  padding-left: 40px;
  width: 320px;
}
.modal-form--addon {
  margin-top: 20px;
}
.modal-form--addon:first-child {
  margin-top: 0;
}
</style>
