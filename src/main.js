import Vue from "vue"
import App from "@/App.vue"
import router from "@/router"
import store from "@/store"

require("@/assets/css/application.scss")

Vue.config.productionTip = false

import "@/initializers/vue_tippy"
import "@/initializers/vee_validate"
import "@/initializers/axios"

import "@/plugins/modal"
import "@/plugins/gallery"
import "@/directives/padded_number"

import "@/api"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
