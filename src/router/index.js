import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect:'/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue'),
    meta:{
      auth: true
    }
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})
router.beforeEach((to,from,next) => {
  let user = true; //emulación usuario inexistente
  let authorization =  to.matched.some(record => record.meta.auth);
  if (!user && authorization){//requiere autorización pero usuario no existe
    next('/');
  } else if (user && !authorization){// //no requiere autorización pero usuario existe
    next('/question')
  }else next()

})

//router.beforeEach((to, from, next) => {
//  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//  else next()
//})


export default router
