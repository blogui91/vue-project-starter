import OAuth from 'src/oauth'
import router from 'src/router'

const oAuth = new OAuth()

router.beforeEach((to, from, next) => {
  // If visiting login view but you already have logged in, you should not be able to see this view
  if (to.name == 'app.login' && oAuth.isAuthenticated()) { // eslint-disable-line eqeqeq
    return next({
      path: '/'
    })
  }
  // If you are visiting '/' and you are a guest then, you must be redirected to login
  if (to.meta.requiresAuth && oAuth.guest()) {
    return next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
  return next()
})
