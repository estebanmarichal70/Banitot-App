
import http from '@/http/banitotServices';

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
    const articulo = {
      articulo_id: item.id,
      carrito_id: item.carrito_id
    }
    if(getters.isInCart(item.id)) 
    {
      http.services.detachCarrito(articulo)
      .then(() => {})
      .catch(error => {
        console.log(error)
      })
      commit('REMOVE_ITEM_FROM_CART', item)
    }
    else 
      dispatch('additemInCart', item)
  },
  additemInCart ({ commit }, item) {
    item['quantity'] = 1
    const articulo = {
      articulo_id: item.id,
      carrito_id: item.carrito_id,
      cantidad: item.quantity
    }

    http.services.atachCarrito(articulo)
    .then(() => {})
    .catch(error => {
      console.log(error)
    })
    commit('ADD_ITEM_IN_CART', item)
  },
  updateItemQuantity ({ commit }, payload) {
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
      console.log(error)
    })
  }
}
