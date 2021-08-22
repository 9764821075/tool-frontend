<template>
  <div>
    <Modal :name="modalName" @before-open="beforeOpen" @opened="opened">
      <form @submit.prevent="save">
        <div class="modal-form-content">
          <h1 class="title">Edit text</h1>

          <div class="field">
            <label class="label" for="source_text">Text</label>
            <div class="control">
              <textarea
                v-model="text"
                rows="16"
                class="textarea"
                id="source_text"
                ref="autofocus" />
            </div>
          </div>
        </div>

        <div class="modal-form-buttons">
          <button class="button is-primary">Save</button>
        </div>
      </form>
    </Modal>

    <div class="inline-group">
      <div class="inline-group-headline">
        <div class="inline-group-headline-text">
          Text
        </div>
      </div>

      <div class="inline-value">
        <a @click="edit" class="inline-edit-button">
          <i class="inline-button-icon fa fa-fw fa-pencil" style="display: inline-block;"></i>
        </a>
        <div class="columns">
          <div class="column" style="padding: 0;">
            <div v-if="source.text" class="inline-value-text">
              <Markdown :text="source.text" />
            </div>

            <div v-else class="inline-value-text light-grey-color">
              No text
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { Markdown } from "@/components_new"

export default {
  name: "SourceText",
  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      modalName: this.$vnode.tag,
      text: null,
    }
  },
  computed: {
    loaded() {
      return this.$store.state.source.source.loaded
    },
    error() {
      return this.$store.state.source.source.error
    },
    source() {
      return this.$store.state.source.source.data
    },
    formattedValue() {
      if (!this.loaded) { return "" }
      return this.source.text
    },
  },
  methods: {
    edit() {
      this.$modal.show(this.modalName)
    },
    save() {
      this.$validator.validateAll().then(valid => {
        if (!valid) { return }

        const source = Object.assign({}, this.source)
        const data = {
          text: this.text,
        }

        this.$store.commit("source/updateSource", data)

        axios
          .patch(`sources/${this.$store.state.resource.id}`, data)
          .then(response => { this.$store.commit("source/setSource", response.data) })
          .catch(error => { this.$store.commit("source/setSource", source) })

        this.$modal.hide(this.modalName)
      })
    },
    beforeOpen() {
      this.text = this.source.text
    },
    opened() {
      this.$refs.autofocus.focus()
    },
  },
  components: {
    Markdown,
  },
}
</script>
