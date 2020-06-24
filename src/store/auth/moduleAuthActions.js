import router from '@/router'
import http from '@/http/banitotServices';

export default {
  // JWT
  loginJWT ({ commit, dispatch}, payload) {
    return new Promise((resolve, reject) => {
      http.services.login({...payload.userDetails})
        .then(response => {
          // If there's user data in response
          if (response.data.user) {
            // Navigate User to homepage
            router.push(router.currentRoute.query.to || '/')

            // Set accessToken
            if(localStorage.getItem('cartItems') === null){
              const cartItems = []    
              localStorage.setItem('cartItems', JSON.stringify(cartItems));
            }
            const wishList = []
              localStorage.setItem('wishList', JSON.stringify(wishList));

            localStorage.setItem('accessToken', JSON.stringify(response.data.token))

            // Update user details
            const cartItems = JSON.parse(localStorage.getItem('cartItems'));
            http.services.getCarrito(response.data.user.carrito[0].id)
            .then(res => {
              res.data.articulos.forEach(item => {
                cartItems.forEach((citem, index) => {
                  if(citem.id === item.id){
                    cartItems.splice(index, 1)
                  }
                })
                dispatch('eCommerce/loadCart', item, {root: true})
              })
              cartItems.forEach(item => {
                const articulo = {
                  articulo_id: item.id,
                  carrito_id: response.data.user.carrito[0].id,
                  cantidad: item.quantity
                }
                http.services.atachCarrito(articulo)
                .then(() => {})
                .catch(error => {
                  this.$vs.notify({
                    title: 'Error',
                    text: error.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                  })
                })
              })
            })
            .catch(error => {
              console.log(error)
              /*this.$vs.notify({
                title: 'Error',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })*/
            })
            http.services.getWishlist(response.data.user.wishlist[0].id)
            .then(res => {
              res.data.articulos.forEach(item => {
                dispatch('eCommerce/loadWishlist', item, {root: true})
              })
            })
            .catch(error => {
              console.log(error)
              /*this.$vs.notify({
                title: 'Error',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })*/
            })
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
