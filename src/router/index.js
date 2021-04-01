import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '巴蒂'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/Toast',
    name: 'Toast',
    component: () => import('../views/function/ToastBoard.vue'),
    meta: {
      title: '公告板'
    }
  },
  {
    path: '/RandomRollCall',
    name: 'RandomRollCall',
    component: () => import('../views/function/RandomRollCall.vue'),
    meta: {
      title: '随机点名'
    }
  },
  {
    path: '/Curriculum',
    name: 'Curriculum',
    component: () => import('../views/function/Curriculum.vue'),
    meta: {
      title: '课程表'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/console/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/console/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/console',
    name: 'Console',
    component: () => import('../views/console/Console.vue'),
    meta: {
      title: '控制台',
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requireAuth)) {
    // 对路由进行验证
    if (store.state.userInfo.logined === true) { // 已经登陆
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title + ' - Buddy'
  }
})

export default router
