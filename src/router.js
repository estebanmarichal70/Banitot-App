import Vue from 'vue'
import Router from 'vue-router'
import state from './store/state'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/',
          redirect: '/inicio'
        },
        {
          path: '/contacto',
          name: 'google-map',
          component: () => import('./views/app/contact/Contact.vue'),
          meta: {}
        },
        {
          path: '/inicio',
          name: 'inicio',
          component: () => import('./views/app/home/Home.vue'),
          meta: {}
        },
        {
          path: '/tienda/:categoria',
          name: 'ecommerce-shop',
          component: () => import('./views/app/shop/Shop.vue'),
          meta: {
            pageTitle: 'Shop',

          }
        },
        {
          path: '/deseados',
          name: 'ecommerce-wish-list',
          component: () => import('./views/app/shop/Wishlist.vue'),
          meta: {
            authRequired: true,
            pageTitle: 'Wish List',

          }
        },
        {
          path: '/checkout',
          name: 'ecommerce-checkout',
          component: () => import('./views/app/shop/Checkout.vue'),
          meta: {
            pageTitle: 'Checkout',

          }
        },
        /*
                  Below route is for demo purpose
                  You can use this route in your app
                    {
                        path: '/apps/eCommerce/item/',
                        name: 'ecommerce-item-detail-view',
                        redirect: '/apps/eCommerce/shop',
                    }
                */
        {
          path: '/articulo/:item_id',
          name: 'ecommerce-item-detail-view',
          component: () => import('./views/app/shop/ItemDetail.vue'),
          meta: {
            parent: 'ecommerce-item-detail-view',
            pageTitle: 'Item Details',

          }
        },

        {
          path: '/usuario/perfil',
          name: 'app-user-edit',
          component: () => import('@/views/user/profile/Profile.vue'),
          meta: {
            authRequired: true,
            pageTitle: 'Profile',

          }
        },
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/acceder',
          name: 'page-login',
          component: () => import('@/views/user/login/Login.vue'),
          meta: {}
        },
        {
          path: '/registrarse',
          name: 'page-register',
          component: () => import('@/views/user/register/Register.vue'),
          meta: {}
        },
        {
          path: '/cuenta-confirmada',
          name: 'page-account-confirmed',
          component: () => import('@/views/user/confirm-account/ConfirmAccount.vue'),
          meta: {}
        },
        {
          path: '/olvide-contraseña',
          name: 'page-forgot-password',
          component: () => import('@/views/user/forgot-password/ForgotPassword.vue'),
          meta: {}
        },
        {
          path: '/restablecer-contraseña',
          name: 'page-reset-password',
          component: () => import('@/views/user/reset-password/ResetPassword.vue'),
          meta: {}
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import('@/views/Error404.vue'),
          meta: {}
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})


router.beforeEach((to, from, next) => {

  if (to.meta.authRequired && state.AppActiveUser.name && to.path !== "/acceder") {
    return next();
  }
  if (to.path !== "/acceder" && !state.AppActiveUser.name && to.meta.authRequired) {
    return router.push('/acceder');
  }
  return next();
})

export default router
