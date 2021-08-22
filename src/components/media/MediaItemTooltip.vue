<template>
  <div class="media-item-tooltip">
    <template v-if="hasDescription">
      <div class="media-item-tooltip--description">
        <b>Description:</b>
        <Markdown :text="file.description" />
      </div>
    </template>

    <template v-if="hasTags">
      <br v-if="hasDescription">

      <div class="media-item-tooltip--tags">
        <b>People:</b>

        <ul class="media-item-tooltip--tags-list">
          <li
            v-for="tag in file.tags"
            :key="tag.id"
            class="media-item-tooltip--tags-list-item">

            <a :href="'/people/' + tag.person.id">{{ tag.person.name }}</a>
          </li>
        </ul>
      </div>
    </template>

    <template v-if="hasSources">
      <br v-if="hasDescription || hasTags">

      <div class="media-item-tooltip--sources">
        <b>Sources:</b>

        <SourceLink
          v-for="source in file.sources"
          :key="source.id"
          :source="source" />
      </div>
    </template>
  </div>
</template>

<script>
import SourceLink from "@/components/sources/SourceLink.vue"
import Markdown from "@/components_new/Markdown.vue"

export default {
  name: "MediaItemTooltip",
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasDescription() {
      return this.file.description
    },
    hasTags() {
      return this.file.tags && this.file.tags.length
    },
    hasSources() {
      return this.file.sources && this.file.sources.length
    },
  },
  components: {
    SourceLink,
    Markdown,
  },
}
</script>

<style lang="scss">
  .media-item-tooltip {
    display: none;
    text-align: left;
    padding: .5rem;
    max-width: 400px;
  }
  .tippy-tooltip .media-item-tooltip {
    display: block;
  }

  .media-item-tooltip .markdown pre,
  .media-item-tooltip .markdown blockquote,
  .media-item-tooltip .markdown p,
  .media-item-tooltip .markdown ul,
  .media-item-tooltip .markdown ol {
    margin-bottom: 1rem;
  }

  .media-item-tooltip .markdown strong {
    color: #fff;
  }

  .media-item-tooltip a {
    color: #00d1b2;
  }
  .media-item-tooltip a:hover {
    color: #fff;
  }

  .media-item-tooltip--description > div > :last-child {
    margin-bottom: 0;
  }
  .media-item-tooltip--tags-list {
    list-style: disc outside;
    margin-bottom: 0;
    margin-left: 15px;
  }
  .media-item-tooltip--tags-list-item {
    margin: 0;
  }
</style>
