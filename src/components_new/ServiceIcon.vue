<template>
  <FacebookIcon v-if="service === 'facebook'" :size="size" />
  <InstagramIcon v-else-if="service === 'instagram'" :size="size" />
  <TumblrIcon v-else-if="service === 'tumblr'" :size="size" />
  <TwitterIcon v-else-if="service === 'twitter'" :size="size" />
  <YouTubeIcon v-else-if="service === 'youtube'" :size="size" />
  <FlickrIcon v-else-if="service === 'flickr'" :size="size" />
  <XingIcon v-else-if="service === 'xing'" :size="size" />
  <VimeoIcon v-else-if="service === 'vimeo'" :size="size" />
  <TelegramIcon v-else-if="service === 'telegram'" :size="size" />
  <WikipediaIcon v-else-if="service === 'wikipedia'" :size="size" />
  <PastebinIcon v-else-if="service === 'pastebin'" :size="size" />
  <WordPressIcon v-else-if="service === 'wordpress'" :size="size" />
  <VkIcon v-else-if="service === 'vk'" :size="size" />
</template>

<script>
import {
  FacebookIcon,
  InstagramIcon,
  TumblrIcon,
  TwitterIcon,
  YouTubeIcon,
  FlickrIcon,
  XingIcon,
  VimeoIcon,
  TelegramIcon,
  WikipediaIcon,
  PastebinIcon,
  WordPressIcon,
  VkIcon,
} from "vue-simple-icons"

export default {
  name: "ServiceIcon",
  props: {
    service: {
      type: String,
    },
  },
  data() {
    return {
      size: "1x",
    }
  },
  components: {
    FacebookIcon,
    InstagramIcon,
    TumblrIcon,
    TwitterIcon,
    YouTubeIcon,
    FlickrIcon,
    XingIcon,
    VimeoIcon,
    TelegramIcon,
    WikipediaIcon,
    PastebinIcon,
    WordPressIcon,
    VkIcon,
  },
}
</script>
