import router from '@/router'
import http from '@/http/banitotServices';

export default {
  // JWT
  loginJWT ({ commit}, payload) {
    return new Promise((resolve, reject) => {
      http.services.login({...payload.userDetails})
        .then(response => {
          // If there's user data in response
          if (response.data.user) {
            // Navigate User to homepage
            router.push(router.currentRoute.query.to || '/')

            // Set accessToken
            localStorage.setItem('accessToken', JSON.stringify(response.data.token))

            // Update user details
            commit('UPDATE_USER_INFO', response.data.user, {root: true})

            resolve(response)
          } else {
            reject({message: 'Wrong Email or Password'})
          }
        })
        .catch(error => { reject(error) })
    })

  }
}
