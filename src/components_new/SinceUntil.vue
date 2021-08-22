<template>
  <div class="since-until">
    <h3 class="since-until--headline">Since/Until</h3>

    <form v-if="isEditing" @submit.prevent="save">
      <div class="since-until--field-group">
        <!-- TODO: add validations to prevent 422 errors -->
        <FormField label="Since" class="since-until--field">
          <AppTextfield
            v-model="since.year"
            small
            maxlength="4"
            placeholder="Year"
            autofocus
          />
        </FormField>

        <FormField class="since-until--field">
          <AppTextfield
            v-model="since.month"
            small
            maxlength="2"
            placeholder="Month"
          />
        </FormField>

        <FormField label="Until" class="since-until--field">
          <AppTextfield
            v-model="until.year"
            small
            maxlength="4"
            placeholder="Year"
          />
        </FormField>

        <FormField class="since-until--field">
          <AppTextfield
            v-model="until.month"
            small
            maxlength="2"
            placeholder="Month"
          />
        </FormField>
      </div>

      <div class="since-until--button-group">
        <div class="since-until--save-button">
          <AppButton type="submit" primary small>Confirm</AppButton>
        </div>

        <AppButton small @click="isEditing = false">Cancel</AppButton>
      </div>
    </form>

    <div v-else>
      <div v-if="hasAnyValue">
        <div style="margin-bottom: 6px">
          <div v-if="hasSince">
            <strong style="display: inline-block; width: 50px">Since:</strong>
            <span v-if="since.year">{{ since.year }}</span>
            <span v-if="since.year && since.month">/</span>
            <span v-if="since.month">{{ padNumber(since.month) }}</span>
          </div>

          <div v-if="hasUntil">
            <strong style="display: inline-block; width: 50px">Until:</strong>
            <span v-if="until.year">{{ until.year }}</span>
            <span v-if="until.year && until.month">/</span>
            <span v-if="until.month">{{ padNumber(until.month) }}</span>
          </div>
        </div>

        <AppButton small @click="isEditing = true">Edit</AppButton>
      </div>

      <div v-else>
        <AppButton small @click="isEditing = true">Add since/until</AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import FormField from "@/components_new/FormField.vue"
import AppButton from "@/components_new/AppButton.vue"
import AppTextfield from "@/components_new/AppTextfield.vue"
import dateHelper from "@/lib/date_helper"

const initialData = () => ({
  isEditing: false,
  since: {
    year: null,
    month: null,
  },
  until: {
    year: null,
    month: null,
  },
})

export default {
  name: "SinceUntil",
  data() {
    return initialData()
  },
  props: {
    formRecord: {
      type: Object,
    },
  },
  created() {
    if (this.formRecord) {
      this.since = this.formRecord.since
      this.until = this.formRecord.until
    }
  },
  computed: {
    hasSince() {
      return this.since && (!!this.since.year || !!this.since.month)
    },
    hasUntil() {
      return this.until && (!!this.until.year || !!this.until.month)
    },
    hasAnyValue() {
      return this.hasSince || this.hasUntil
    },
  },
  methods: {
    save() {
      this.$emit('save', {
        since: this.since,
        until: this.until,
      })
      this.isEditing = false
    },
    padNumber: dateHelper.padNumber,
  },
  components: {
    FormField,
    AppButton,
    AppTextfield,
  },
}
</script>

<style lang="scss" scoped>
.since-until--headline {
  margin-bottom: 16px;
}
.since-until--field-group {
  display: flex;
  align-items: flex-end;
}
.since-until--field {
  margin-right: 5px;
}
.since-until--field:last-child {
  margin-right: 0;
}
.since-until--button-group {
  display: flex;
  padding-bottom: 12px;
}
.since-until--save-button {
  margin-right: .2rem;
}
</style>
