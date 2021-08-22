<template>
  <Modal :name="modalName" :wide="true" @before-open="beforeOpen" @opened="opened">
    <form @submit.prevent="save" style="display: table; width: 100%;">
      <div class="modal-form-wrapper" style="display: table-cell;">
        <div class="modal-form-content">
          <h1 class="title">
            <span v-if="id">Edit file</span>
            <span v-else>Add files</span>
          </h1>

          <div class="field">
            <label class="label" for="description">Description</label>
            <div class="control">
              <textarea
                v-model="description"
                class="textarea"
                ref="autofocus"
                id="description">
              </textarea>
            </div>
          </div>
        </div>

        <div class="modal-form-buttons">
          <button class="button is-primary">Save</button>
          <a v-if="id" @click.prevent="destroy" class="button is-danger is-outlined pull-right">Delete</a>
        </div>
      </div>

      <div style="border-top-right-radius: 6px; display: table-cell; background: #f6f6f6; height: 100%; width: 35%; padding: 1.5rem 2rem 2rem; border-bottom-right-radius: 6px; border-left: 1px solid #ebebeb;">
        <InlineSources :record.sync="localSources" />
      </div>
    </form>
  </Modal>
</template>

<script>
  import SourceHelper from "@/components/sources/SourceHelper"
  import InlineSources from "@/components/inline/InlineSources.vue"

  const initialData = () => {
    return {
      type: "none",
      id: null,
      files: [],
      description: null,
      localSources: {
        sources: [],
      },
      sources: [],
    }
  }

  export default {
    name: "MediaFormModal",
    props: {
      modalName: {
        type: String,
        required: true,
      },
    },
    data() {
      return initialData()
    },
    methods: {
      save() {
        const data = Object.assign({}, this.$data)
        data.sources = SourceHelper.prepareData(this.localSources.sources)

        this.$emit("save", data)
        this.$modal.hide(this.modalName)
      },
      destroy() {
        this.$emit("destroy", this.$data.id)
        this.$modal.hide(this.modalName)
      },
      beforeOpen(params) {
        Object.assign(this.$data, initialData(), params)
        this.localSources.sources = this.sources.map(s => ({...s}))
      },
      opened() {
        this.$refs.autofocus.focus()
      },
    },
    components: {
      InlineSources,
      // SourceList,
    },
  }
</script>
