<template>
  <div class="photo-tag-form">
    <FormField label="Person*" :error="errors.person">
      <ResourceSelect
        v-model="person"
        resource="people"
        autofocus
      />
    </FormField>

    <button @click="saveTag" class="button is-primary">Save</button>

    <button
      v-if="newTag"
      @click="$emit('cancel-tag')"
      class="button is-outlined pull-right"
    >
      Cancel
    </button>

    <button
      v-if="!newTag"
      @click="$emit('delete-tag')"
      class="button is-outlined is-danger pull-right"
    >
      Delete
    </button>
  </div>
</template>

<script>
import { FormField, ResourceSelect } from "@/components_new"

export default {
  name: "PhotoTagForm",
  props: {
    tag: {
      type: Object,
      required: true,
    },
    newTag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      person: this.tag.person,
      errors: {},
    }
  },
  created() {
    if (this.tag) {
      this.person = this.tag.person
    }
  },
  methods: {
    saveTag() {
      if (!this.person) {
        this.errors.person = "is required"
        return
      }

      this.$emit("save-tag", this.person)
    },
  },
  components: {
    FormField,
    ResourceSelect,
  },
}
</script>

<style lang="scss" scoped>
.photo-tag-form {
  background: #fff;
  padding: 1.5rem;
  width: 400px;
  border-radius: 3px;
  border-top-left-radius: 0;
  position: absolute;
  bottom: -160px;
  left: 0px;
  height: 145px;
  text-align: left;
  z-index: 999;
}
.photo-tag-form .selectize-control.single .selectize-input,
.photo-tag-form .selectize-dropdown-content {
  background: #fff;
}

.photo-tag-form .button {
  border-radius: 25px !important;
}

.photo-tag-form-error {
  color: #db1e1e;
  font-style: italic;
}
</style>
