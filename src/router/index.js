import Vue from 'vue'
import VueRouter from 'vue-router'

import { setHeadersAuthToken, isLoggedIn } from '@/services/authService'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: { path: '/login' },
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/reset-password/:token?',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "login" */ '@/views/ResetPassword.vue'),
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dash" */ '@/views/Dashboard.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'direct-mail/:id?',
        name: 'directMail',
        component: () => import(/* webpackChunkName: "directMail" */ '@/views/DirectMail.vue'),
      },
      {
        path: 'direct-mail-processing/:id',
        name: 'directMailProcessing',
        component: () => import(/* webpackChunkName: "processingMails" */ '@/views/DirectMailProcessing.vue'),
      },
      {
        path: 'direct-mail-list',
        name: 'DirectMailList',
        component: () => import(/* webpackChunkName: "DirectMailList" */ '@/views/DirectMailList.vue'),
      },
      {
        path: 'users',
        name: 'UserListCad',
        component: () => import(/* webpackChunkName: "UserListCad" */ '@/views/UserListCad.vue'),
      },
      {
        path: 'perfil',
        name: 'Perfil',
        component: () => import(/* webpackChunkName: "Perfil" */ '@/views/Perfil.vue'),
      },
    ]
  },
  {
    path: '/nps',
    name: 'DashNps',
    component: () => import(/* webpackChunkName: "dashnps" */ '@/views/DashNps.vue'),
    meta: {
      allowAnonymous: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  // Seta header padrao de autorizacao na biblioteca do axios
  setHeadersAuthToken()

  // Valida se usuario esta logado e tentando acessar a tela de login
  if ((to.name === 'index' || to.name === 'login') && isLoggedIn()) {
    
    next({ path: 'home' })
    return;
  
    // Valida se rota é bloqueada e usuario nao esta logado
  } else if (to.matched.some(record => !record.meta.allowAnonymous) && !isLoggedIn()) {

    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return;

  } else next()
})

export default router
