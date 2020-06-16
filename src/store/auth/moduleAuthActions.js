/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import jwt from '../../http/requests/auth/jwt/index.js'
import router from '@/router'
import http from "../../http/banitotServices";

export default {
  // JWT
  loginJWT ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      http.services.login({...payload.userDetails})
        .then(response => {
          // If there's user data in response
          if (response.data.user) {
            // Navigate User to homepage
            router.push(router.currentRoute.query.to || '/')

            // Set accessToken
            localStorage.setItem('accessToken', response.data.token)

            // Update user details
            commit('UPDATE_USER_INFO', response.data.user, {root: true})

            // Set bearer token in axios
            commit('SET_BEARER', response.data.token)

            resolve(response)
          } else {
            reject({message: 'Wrong Email or Password'})
          }

        })
        .catch(error => { reject(error) })
    })
  }
}
