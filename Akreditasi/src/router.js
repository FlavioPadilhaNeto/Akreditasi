import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import store from "./store";

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/");
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/login");
};


export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('./views/UserProfile.vue'),
          beforeEnter: ifAuthenticated
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import('./views/Tables.vue'),
          beforeEnter: ifAuthenticated
        }
      ]
      },
      {
          path: '/',
          redirect: 'login',
          component: AuthLayout,
          children: [
              {
                  path: '/login',
                  name: 'login',
                  component: () => import('./views/Login.vue'),
                  beforeEnter: ifNotAuthenticated
              }
          ]
      }
  ]
})
