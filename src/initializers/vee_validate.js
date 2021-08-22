import Vue from "vue"
import VeeValidate from "vee-validate"

// Configuration options:
// http://vee-validate.logaretm.com/configuration.html#configuration
Vue.use(VeeValidate, {
  inject: false,
  locale: "en",
  strict: false,
  events: "",
})
