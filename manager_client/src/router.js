import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'manager',
      path: '/',
      redirect: { name: 'articleList' },
      component: () => import('./views/manager.vue'),
      meta: {
        label: '后台管理',
        text: true,
      },
      children: [
        {
          name: 'articleList',
          path: 'articleList',
          component: () => import('./views/articleList.vue'),
        }
      ]
    }, 
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/login.vue'),
      meta: {
        label: '用户登录',
        text: true,
      }
    }
  ]
})
