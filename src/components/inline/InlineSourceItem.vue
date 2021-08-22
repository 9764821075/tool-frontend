<template>
  <div style="display: table; margin-bottom: .5rem;">
    <div style="display: table-cell;">
      <div v-if="editMode" class="field" style="margin-bottom: 0;">
        <div class="control" style="flex-grow: 1;">
          <input
            v-model="source.url"
            type="text"
            maxlength="250"
            autocomplete="off"
            class="input"
            placeholder="https://"
            ref="autofocus"
            style="font-size: .8rem;" />
        </div>
      </div>

      <SourceLink
        v-if="!editMode"
        :source="source" />
    </div>

    <a v-if="editMode" @click="deleteItem" class="icon-link icon-link-delete" style="display: table-cell; width: 1%; vertical-align: text-top; padding-left: .5rem;">
      <i class="fa fa-fw fa-times"></i>
    </a>

    <a v-else @click="editItem" class="icon-link" style="display: table-cell; width: 1%; vertical-align: text-top; padding-left: .5rem;">
      <i class="fa fa-fw fa-pencil"></i>
    </a>
  </div>
</template>

<script>
  import SourceLink from "@/components/sources/SourceLink.vue"

  export default {
    name: "InlineSourceItem",
    props: {
      source: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        editMode: false,
      }
    },
    created() {
      if (!this.source.url) {
        this.editItem()
      }
    },
    methods: {
      editItem() {
        this.editMode = true
        this.$nextTick(() => this.$refs.autofocus.focus())
      },
      deleteItem() {
        this.$emit("delete-item", this.source.id)
      },
    },
    components: {
      SourceLink,
    },
  }
</script>
