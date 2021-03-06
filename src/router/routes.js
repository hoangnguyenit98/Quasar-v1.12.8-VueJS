
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "home", component: () => import('pages/Home.vue') }
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },

  {
    path: '/registration',
    name: 'registration',
    component: () => import('pages/Registration.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
