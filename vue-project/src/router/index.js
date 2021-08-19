/* eslint-disable no-debugger */

import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  let tokenValue = JSON.parse(localStorage.getItem("email"));
  if (to.path === "/Home") {
    if (tokenValue !== null || tokenValue === "") {
      next();
    } else {
      router.push({ path: "/" });
    }
  } else {
    if (tokenValue === null || tokenValue === "") {
      if (to.path === "/") {
        next();
      } else {
        router.push({ path: "/" });
      }
    } else {
      router.push({ path: "/Home" });
    }
  }
});

export default router;
