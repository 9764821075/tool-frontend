<template>
  <div style="font-size: .8rem; white-space: nowrap;">
    <i :class="'fa fa-fw fa-' + icon" style="text-align: left;"></i>
    <router-link :to="'/sources/' + source.id">{{ description }}</router-link>
  </div>
</template>

<script>
  import analyzeUrl from "@/lib/analyze_url"
  import describeUrl from "@/lib/describe_url"

  export default {
    name: "SourceLink",
    props: {
      source: {
        type: Object,
        required: true,
      },
    },
    computed: {
      analysis() {
        return analyzeUrl(this.source.url)
      },
      icon() {
        return (this.analysis && this.analysis.service) || "globe"
      },
      description() {
        if (this.analysis) {
          return describeUrl(this.analysis)
        }

        return this.source.url.substring(25) + "..."
      },
    },
  }
</script>
