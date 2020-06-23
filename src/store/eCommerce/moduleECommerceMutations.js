
import http from '@/http/banitotServices';

export default {
  TOGGLE_ITEM_IN_WISH_LIST (state, item) {
    const index = state.wishList.findIndex(i => i.id === item.id)
    const articulo = {
      articulo_id: item.id,
      wishlist_id: item.wishlist_id
    }
    if (index < 0) {
      http.services.atachWishlist(articulo)
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
      state.wishList.push(item)
    } else {
      http.services.detachWishlist(articulo)
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
      state.wishList.splice(index, 1)
    }
  },
  REMOVE_ITEM_FROM_CART (state, item) {
    const index = state.cartItems.findIndex(i => i.id === item.id)
    if (index > -1) { state.cartItems.splice(index, 1) }
  },
  ADD_ITEM_IN_CART (state, item) {
    state.cartItems.push(Object.assign({}, item))
  },
  ADD_ITEM_IN_WISH_LIST (state, item) {
    state.wishList.push(item)
  },
  UPDATE_ITEM_QUANTITY (state, payload) {
    state.cartItems[payload.index].quantity = payload.quantity
  }
}

