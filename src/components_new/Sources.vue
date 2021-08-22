<template>
  <div class="sources">
    <h3>Sources</h3>
    ...
  </div>
</template>

<script>
import FormField from "@/components_new/FormField.vue"
import AppTextfield from "@/components_new/AppTextfield.vue"

export default {
  name: "Sources",
  data() {
    return {
      since: {
        year: null,
        month: null,
      },
      until: {
        year: null,
        month: null,
      },
    }
  },
  props: {
    record: {
      type: Object,
    },
  },
  components: {
    FormField,
    AppTextfield,
  },
}
</script>

