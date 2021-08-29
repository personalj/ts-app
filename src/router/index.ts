import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Activity from "../views/Activity.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Activity",
    component: Activity,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
