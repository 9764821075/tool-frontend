<template>
  <table style="margin-top: .5rem;">
    <tbody>
      <tr>
        <td>
          <input
            v-model="source.url"
            type="text"
            name="source"
            placeholder="https://"
            maxlength="250"
            autocomplete="off"
            class="input">
        </td>
        <td style="width: 1%">
          <button @click.prevent="destroySource" type="button" class="button" style="margin-left: .5rem;">
            <i class="fa fa-fw fa-times"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "SourceItem",
    props: {
      index: {
        type: Number,
        required: true,
      },
      source: {
        type: Object,
        required: true,
      },
    },
    methods: {
      destroySource() {
        this.$emit("destroy-record", this.index)
      },
    },
  }
</script>
