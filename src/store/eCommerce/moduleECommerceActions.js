
import http from '@/http/banitotServices';
import state from "../state"

export default {
  loadCart ({ commit }, item){
    item['quantity'] = item.pivot.cantidad
    commit('ADD_ITEM_IN_CART', item)
  },
  loadWishlist ({ commit }, item){
    commit('ADD_ITEM_IN_WISH_LIST', item)
  },
  toggleItemInWishList ({ commit }, item) {
    commit('TOGGLE_ITEM_IN_WISH_LIST', item)
  },
  toggleItemInCart ({ getters, commit, dispatch }, item) {
    if(state.AppActiveUser.name){
      console.log("entra")
      const articulo = {
        articulo_id: item.id,
        carrito_id: item.carrito_id
      }
      if(getters.isInCart(item.id))
      {
        http.services.detachCarrito(articulo)
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
        commit('REMOVE_ITEM_FROM_CART', item)
      }
      else
        dispatch('additemInCart', item)
    } else {
      if(getters.isInCart(item.id))
        commit('REMOVE_ITEM_FROM_CART', item)
      else
        dispatch('additemInCart', item)
    }
  },
  additemInCart ({ commit }, item) {
    item['quantity'] = 1
    if(state.AppActiveUser.name){
      const articulo = {
        articulo_id: item.id,
        carrito_id: item.carrito_id,
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
      commit('ADD_ITEM_IN_CART', item)
    } else
      commit('ADD_ITEM_IN_CART', item)
  },
  updateItemQuantity ({ commit }, payload) {
    if(state.AppActiveUser.name){
      const articulo = {
        articulo_id: payload.articulo_id,
        carrito_id: payload.carrito_id,
        cantidad: payload.quantity
      }

      http.services.atachCarrito(articulo)
      .then(() => {
        commit('UPDATE_ITEM_QUANTITY', payload)
      })
      .catch(error => {
        this.$vs.notify({
          title: 'Error',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
    }
    else
      commit('UPDATE_ITEM_QUANTITY', payload)
  }
}
