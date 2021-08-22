import Vue from "vue"
import Modal from "./Modal.vue"

const Plugin = {
  install(Vue, options = {}) {
    if (this.installed) { return }

    this.installed = true
    this.event = new Vue()
    this.componentName = "Modal"

    Vue.prototype.$modal = {
      show(modal, params) {
        Plugin.event.$emit("toggle", modal, true, params || {})
      },
      hide(name, params) {
        Plugin.event.$emit("toggle", name, false, params || {})
      },
      toggle(name, params) {
        Plugin.event.$emit("toggle", name, undefined, params || {})
      },
    }

    Vue.component(this.componentName, Modal)
  }
}

Vue.use(Plugin)

export default Plugin
