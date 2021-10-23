import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue"
// import store from "../store";
//import {mapGetters} from 'vuex'

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/",
  },

  {
    path: "/",
    name: "Home",
    //component: () => import( "../views/Home.vue" )
    component: Home
  },

  {
    path: "/auth",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      registro: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});


export default router;
