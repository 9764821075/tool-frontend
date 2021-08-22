<template>
  <div style="display: table; margin-bottom: .5rem;">
    <div style="display: table-cell;">
      <div v-if="editMode" class="field" style="margin-bottom: 0;">
        <div class="control" style="font-size: .8rem;">
          <label class="radio" style="padding-left: 1px;">
            <input v-model="status.type" type="radio" value="verified" style="margin-right: .2rem;">
            Verified
          </label>
          <label class="radio" style="margin-left: 1.5rem;">
            <input v-model="status.type" type="radio" value="outdated" style="margin-right: .2rem;">
            Outdated
          </label>
        </div>

        <div class="columns" style="padding-top: .5rem;">
          <div class="column" style="padding: .75rem .2rem .75rem .75rem;">
            <div class="control">
              <input
                v-model="status.date_day"
                type="text"
                maxlength="2"
                autocomplete="off"
                class="input"
                placeholder="Day"
                style="font-size: .8rem;" />
            </div>
          </div>
          <div class="column" style="padding: .75rem .2rem .75rem .2rem;">
            <div class="control">
              <input
                v-model="status.date_month"
                type="text"
                maxlength="2"
                autocomplete="off"
                class="input"
                placeholder="Month"
                style="font-size: .8rem;" />
            </div>
          </div>
          <div class="column" style="padding: .75rem .75rem .75rem .2rem; flex-grow: 1.5;">
            <div class="control">
              <input
                v-model="status.date_year"
                type="text"
                maxlength="4"
                autocomplete="off"
                class="input"
                placeholder="Year"
                style="font-size: .8rem;" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="!editMode" style="font-size: .8rem;">
        <i v-if="isVerified" class="fa fa-fw fa-check-circle has-text-success"></i>
        <i v-if="isOutdated" class="fa fa-fw fa-warning has-text-danger"></i>
        {{ statusText }}
      </div>
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
  import dateHelper from "@/lib/date_helper"

  export default {
    name: "InlineStatusItem",
    props: {
      status: {
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
      if (!this.status.type) {
        this.editItem()
      }
    },
    computed: {
      isVerified() {
        return this.status.type == "verified"
      },
      isOutdated() {
        return this.status.type == "outdated"
      },
      statusText() {
        const type = this.status.type.charAt(0).toUpperCase() + this.status.type.slice(1)
        const date = dateHelper.formatDate(this.status)

        if (date) {
          return `${type} (${date})`
        } else {
          return type
        }
      },
    },
    methods: {
      editItem() {
        this.editMode = true
      },
      deleteItem() {
        this.$emit("delete-item", this.status.id)
      },
    },
  }
</script>
