import Vue from "vue"
import Router from "vue-router"

import store from "@/store"

import PeopleView from "@/views/PeopleView.vue"
import PersonView from "@/views/PersonView.vue"
import ActivitiesView from "@/views/ActivitiesView.vue"
import ActivityView from "@/views/ActivityView.vue"
import OrganizationsView from "@/views/OrganizationsView.vue"
import OrganizationView from "@/views/OrganizationView.vue"
import SourcesView from "@/views/SourcesView.vue"
import SourceView from "@/views/SourceView.vue"
import NotFoundView from "@/views/NotFoundView"

Vue.use(Router)

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "People" },
  },
  {
    path: "/activities",
    name: "Activities",
    component: ActivitiesView,
    meta: { resource: { singular: "activity", plural: "activities" } },
  },
  {
    path: "/activities/:id",
    name: "Activity",
    component: ActivityView,
    meta: { resource: { singular: "activity", plural: "activities" } },
  },
  {
    path: "/people",
    name: "People",
    component: PeopleView,
    meta: { resource: { singular: "person", plural: "people" } },
  },
  {
    path: "/people/:id",
    name: "Person",
    component: PersonView,
    meta: { resource: { singular: "person", plural: "people" } },
  },
  {
    path: "/organizations",
    name: "Organizations",
    component: OrganizationsView,
    meta: { resource: { singular: "organization", plural: "organizations" } },
  },
  {
    path: "/organizations/:id",
    name: "Organization",
    component: OrganizationView,
    meta: { resource: { singular: "organization", plural: "organizations" } },
  },
  {
    path: "/sources",
    name: "Sources",
    component: SourcesView,
    meta: { resource: { singular: "source", plural: "sources" } },
  },
  {
    path: "/sources/:id",
    name: "Source",
    component: SourceView,
    meta: { resource: { singular: "source", plural: "sources" } },
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFoundView,
  },
]

const router = new Router({
  routes: routes,
  mode: "history",
  linkActiveClass: "is-active",
})

router.beforeEach((to, from, next) => {
  if (to.meta.resource) {
    store.commit("setResource", Object.assign({}, to.meta.resource, { id: to.params.id }))
  } else {
    store.commit("setResource", {})
  }

  next()
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
