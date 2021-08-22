<template>
  <VueShowdown
    class="markdown"
    :flavor="flavor"
    :options="options"
    :markdown="text"
  />
</template>

<script>
import { VueShowdown } from "vue-showdown"

export default {
  name: "Markdown",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      flavor: "github",
      options: {
        emoji: true,
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        simpleLineBreaks: true,
      },
    }
  },
  components: {
    VueShowdown,
  },
}
</script>

<style lang="scss">
.markdown {
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.markdown :last-child {
  margin-bottom: 0;
}
.markdown pre,
.markdown blockquote,
.markdown p,
.markdown ul,
.markdown ol {
  margin-bottom: 1.25rem;
}
.markdown ul,
.markdown ol {
  margin-left: 1rem;
}
.markdown ul {
  list-style-type: disc;
}
.markdown blockquote {
  margin: 5rem 0 3rem;
  quotes: "\201C""\201D""\2018""\2019";
}
.markdown blockquote:before {
  color: $colors-lighter-grey;
  content: open-quote;
  font-size: 8em;
  line-height: 0;
  margin-right: .06em;
  vertical-align: -.4em;
  margin-left: -.24em;
}
.markdown blockquote p {
  display: inline;
  font-style: italic;
}
</style>
