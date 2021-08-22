import Vue from "vue"
import Gallery from "./Gallery.vue"

const Plugin = {
  install(Vue, options = {}) {
    if (this.installed) { return }
    this.installed = true

    this.dynamicContainer = null

    const handleKeyEvent = (event) => {
      if (event.keyCode == 27) { // esc
        $gallery.hide()
      } else if (event.keyCode == 37) { // left
        Plugin.dynamicContainer.prev()
      } else if (event.keyCode == 39) { // right
        Plugin.dynamicContainer.next()
      }
    }

    const $gallery = {
      setDynamicContainer(dynamicContainer) {
        Plugin.dynamicContainer = dynamicContainer
      },
      show(files, index, options) {
        if (Plugin.dynamicContainer === null) {
          console.warn("A <venobox-gallery> component must be present on the page")
          return
        }

        Plugin.dynamicContainer.show(files, index, options)
        document.body.addEventListener("keyup", handleKeyEvent)
      },
      hide() {
        Plugin.dynamicContainer.hide()
        document.body.removeEventListener("keyup", handleKeyEvent)
      },
    }

    Vue.prototype.$gallery = $gallery

    Vue.component("venobox-gallery", Gallery)
  }
}

Vue.use(Plugin)

export default Plugin
