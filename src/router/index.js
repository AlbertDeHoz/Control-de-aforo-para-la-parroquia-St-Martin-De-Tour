import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
//import {mapGetters} from 'vuex'

Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect:'/'
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta:{
      registro: true
    }
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue'),
    meta:{
      registro: true
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      registro: false
    }
  },
  /**
   * Este es el lado del administrador
   */
  {  
    path: '/auth',
    name: 'Login',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Login.vue'),
    meta:{
      registro: false
    }
  },
  {
    path: '/admin',
    //name: 'Admin',
    component: () => import('../views/Admin/Admin.vue'),
    meta:{
      registro: false,
      autorizacion: true
    },
    children:[
      {
        path:'/',
        name:'Admin',
        component: () => import("../views/Admin/Home.vue")
      },
      {
        path:'userlist',
        name:'UserList',
        component: () => import('../views/Admin/Userlist.vue'),
        meta:{
          registro: false,
          autorizacion: true
        }
      },
      {
        path:'services',
        name:'Services',
        component: () => import('../views/Admin/Services.vue'),
        meta:{
          registro: false,
          autorizacion: true
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})
const userExist = () => {
  try{
    const {idNumber,idType} = store.state.userId;
    return (idNumber!=null && idType != null) ? true:false;
  }catch{
    return false
  }
}
router.beforeEach((to,from,next) =>{
  //const user = userExist()
  const registro = to.matched.some(record => record.meta.registro);
  //const autorizacion = to.matched.some(record => record.meta.autorizacion);
  //const role = store.state.role;
  //if (autorizacion){
  //  if (role !== "Administrador"){
  //    next({path:'/auth'})
  //  }else {
  //    next()
  //  }
  //}else{
    if (registro && !userExist()){
      next({path:'/'})
    }
    else{
      next()
    }
  //}
})


export default router
