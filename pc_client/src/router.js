import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue')
    }, {
      path: '/about',
      name: 'about',
      component: () => import('../../web_depends/staticPages/about.vue')
    }, {
      path: '/contractUs',
      name: 'contractUs',
      component: () => import('../../web_depends/staticPages/contractUs.vue')
    }, {
      path: '/joinUs',
      name: 'joinUs',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../web_depends/staticPages/joinUs.vue')
    }, {
      path: '/service',
      name: 'service',
      component: () => import('./views/service.vue'),
    }, {
      path: '/service/:tag',
      name: 'serviceTag',
      component: () => import('./views/service.vue'),
    }, {
      path: '/article/:filename',
      name: 'article',
      component: () => import('./views/articleWrapper.vue'),
    }, {
      path: '/state',
      name: 'state',
      component: () => import('./views/state.vue'),
    }, {
      path: '/state/:tag',
      name: 'stateTag',
      component: () => import('./views/state.vue'),
    }
  ]
})
