export default {
  isInCart: state => itemId => {
    return state.cartItems.some((item) => item.id === itemId)
  },
  isInWishList: state => itemId => {
    return state.wishList.some((item) => item.id === itemId)
  },
  getCartItem: state => itemId => {
    const result = state.cartItems.filter((item) => item.id === itemId)
    return result.length ? result.pop() : []
  }
}
