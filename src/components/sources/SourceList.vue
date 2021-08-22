<template>
  <div>
    <div class="level" style="margin-bottom: 1rem;">
      <div class="level-left">
        <div class="level-item">
          <label class="label">Sources</label>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <a @click.prevent="addSource" class="button">Add source</a>
        </div>
      </div>
    </div>

    <SourceItem
      v-for="(source, index) in sources"
      :key="source.id"
      :index="index"
      :source="source"
      @destroy-record="destroySource" />
  </div>
</template>

<script>
  import SourceItem from "./SourceItem.vue"

  export default {
    name: "SourceList",
    props: {
      sources: {
        type: Array,
        required: true,
        default: () => { return [] },
      },
    },
    created() {
      if (this.sources.length == 0) {
        this.addSource()
      }
    },
    methods: {
      addSource() {
        this.sources.push({})
      },
      destroySource(index) {
        this.sources.splice(index, 1)
      },
    },
    components: {
      SourceItem,
    },
  }
</script>
