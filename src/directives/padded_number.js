import Vue from "vue"
import dateHelper from "@/lib/date_helper"

Vue.directive("paddedNumber", {
  bind(el) {
    const event = new Event("input", { bubbles: true })
    el.value = dateHelper.padNumber(el.value)
    el.dispatchEvent(event)
  }
})
