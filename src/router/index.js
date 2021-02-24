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
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      registro: false
    }
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
    name: 'Admin',
    component: () => import('../views/Auth.vue'),
    meta:{
      registro: false,
      autorizacion: true
    },
    children:[
      {
        path:'userlist',
        name:'UserList',
        component: () => import('../views/Admin.vue'),
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
router.beforeEach((to,from,next) => {
  const user = store.state.userId;
  const registro = to.matched.some(record => record.meta.registro);
  const autorizacion = to.matched.some(record => record.meta.autorizacion);
  const role = store.state.role
  if (autorizacion){
    if ( role !=="Administrador"){
      next({path:'/auth'})
    }
    else {
      console.log(role)
      next()
    }
  }
  else {
    if (!user && registro){
      next('Home')
    }else if( user && !registro){
      next('Question')
    }else{
      next()
    }
  }

})

export default router
