
import http from '@/http/banitotServices';

export default {
  TOGGLE_ITEM_IN_WISH_LIST (state, item) {
    const wishList = JSON.parse(localStorage.getItem('wishList'));
    const index = state.wishList.findIndex(i => i.id === item.id)
    const articulo = {
      articulo_id: item.id,
      wishlist_id: item.wishlist_id
    }
    if (index < 0) {
      http.services.atachWishlist(articulo)
      .then(() => {})
      wishList.push(item);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      state.wishList.push(item)
    } else {
      http.services.detachWishlist(articulo)
      .then(() => {})
      wishList.splice(index, 1)
      localStorage.setItem("wishList", JSON.stringify(wishList));
      state.wishList.splice(index, 1)
    }
  },
  REMOVE_ITEM_FROM_CART (state, item) {
    const index = state.cartItems.findIndex(i => i.id === item.id)
    if (index > -1) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      state.cartItems.splice(index, 1) 
    }
  },
  ADD_ITEM_IN_CART (state, item) {
    const index = state.cartItems.findIndex(i => i.id === item.id)
    if (index < 0){
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      cartItems.push(item);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      state.cartItems.push(Object.assign({}, item))
    }
    
  },
  ADD_ITEM_IN_WISH_LIST (state, item) {
    const index = state.wishList.findIndex(i => i.id === item.id)
    if (index < 0){
      const wishList = JSON.parse(localStorage.getItem('wishList'));
      wishList.push(item);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      state.wishList.push(item)
    }
  },
  UPDATE_ITEM_QUANTITY (state, payload) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    cartItems[payload.index].quantity = payload.quantity
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    state.cartItems[payload.index].quantity = payload.quantity
  },
  RESET_ALL (state) {
    localStorage.removeItem("cartItems")
    localStorage.removeItem("wishList")
    state.cartItems = []
    state.wishList = []
  }
}

