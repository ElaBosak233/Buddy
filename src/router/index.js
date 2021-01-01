import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页 - Buddy'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '关于 - Buddy'
    }
  },
  {
    path: '/RandomRollCall',
    name: 'RandomRollCall',
    component: () => import('../views/RandomRollCall.vue'),
    meta: {
      title: '随机点名 - Buddy'
    }
  },
  {
    path: '/2048',
    name: '2048',
    component: () => import('../views/2048.vue'),
    meta: {
      title: '2048 - Buddy'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
