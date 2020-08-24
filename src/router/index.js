import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";
import { HTTP_CODES } from "../api/endpoint";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function({ store } /* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach(async (to, from, next) => {
    let hasAuth = store.getters["auth/getUser"];

    if (!hasAuth) {
      let response = await store.dispatch("auth/acGetProfile");
      if (response.code == HTTP_CODES.SUCCESS) {
        hasAuth = response.payload;
      }
    }

    if (hasAuth) {
      if (to.name == "login") {
        return next({ name: "home" });
      }
      return next();
    }

    if (to.name != "login" && to.name != "registration") {
      return next({ name: "login" });
    }

    return next();
  });

  return Router;
}
