import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue"
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
    name: "Main",
    //component: () => import( "../views/Home.vue" )
    component: Main,
    children:[
      {
        path:"/",
        name:"Home",
        component: () => import( "../views/Home.vue" )
      },
      {
        path:"/catequizados",
        name:"Catequizados",
        component: () => import( "../views/Catequizados.vue" )
      }
    ],
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
