import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Home.vue')
    }, {
      name: 'manage',
      path: '/manage',
      component: () => import('@/views/manage/index.vue'),
      redirect: { name: 'article' },
      meta: {
        label: '后台管理',
        text: true,
      },
      children: [
        {
          name: 'article',
          path: 'acticel',
          component: () => import('@/views/manage/article/index.vue'),
        }, {
          name: 'appCaseManage',
          path: 'appCaseManage',
          component: () => import('@/views/manage/appcase/index.vue'),
        }, {
          name: 'vedio',
          path: 'vedioManage',
          component: () => import('@/views/manage/vedio/index.vue'),
        }, {
          name: 'banner',
          path: 'bannerManage',
          component: () => import('@/views/manage/banner/index.vue'),
        },
      ],
    }, {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/manager/index.vue'),
      meta: {
        label: '用户登录',
        text: true,
      }
    }
  ]
})
