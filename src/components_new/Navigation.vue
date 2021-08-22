<template>
  <nav class="navigation" role="navigation" aria-label="main navigation">
    <div class="navigation-logo">
      <ChevronsDownIcon size="1x" />
    </div>

    <router-link
      to="/people"
      title="People"
      v-tippy="{ placement : 'right', arrow: 'left' }"
      class="navigation-item"
    >
      <UserIcon size="1x" />
    </router-link>

    <router-link
      to="/organizations"
      title="Groups"
      v-tippy="{ placement : 'right', arrow: 'left' }"
      class="navigation-item"
    >
      <UsersIcon size="1x" />
    </router-link>

    <router-link
      to="/activities"
      title="Activities"
      v-tippy="{ placement : 'right', arrow: 'left' }"
      class="navigation-item"
    >
      <ActivityIcon size="1x" />
    </router-link>

    <router-link
      to="/sources"
      title="Sources"
      v-tippy="{ placement : 'right', arrow: 'left' }"
      class="navigation-item"
    >
      <BookIcon size="1x" />
    </router-link>
  </nav>
</template>

<script>
import { ChevronsDownIcon, UserIcon, UsersIcon, ActivityIcon, BookIcon } from "vue-feather-icons"

export default {
  name: "Navigation",
  components: {
    ChevronsDownIcon,
    UserIcon,
    UsersIcon,
    ActivityIcon,
    BookIcon,
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5rem;
  min-width: 5rem;
  background: $colors-lighter-grey;
  border: 1px solid darken($colors-lighter-grey, 1%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.navigation:hover {
  border-color: darken($colors-lighter-grey, 4%);
}
.navigation-logo {
  margin: 56px 0;
  color: $colors-light-grey;
}
.navigation-item {
  padding: 12px 16px;
  color: $colors-light-grey;
  transition: color 0.15s ease-out;

  &:first-child {
    margin-top: 60px;
  }
  &:hover {
    color: $colors-dark-grey;
  }

  &.is-active {
    color: $colors-highlight;
  }
}
</style>
