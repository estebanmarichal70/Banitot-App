/* eslint-disable */
const cartItemsLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || {}
const wishListLocalStorage = JSON.parse(localStorage.getItem('wishList')) || {}

const getCartItems = () => {
  let cartItems = []

  Object.keys(cartItemsLocalStorage).forEach((key) => {
    if (cartItems[key] === undefined && cartItemsLocalStorage[key] !== null) cartItems[key] = cartItemsLocalStorage[key]
  })

  return cartItems
}

const getWishList = () => {
    let wishList = []

    Object.keys(wishListLocalStorage).forEach((key) => {
      if (wishList[key] === undefined && wishListLocalStorage[key] !== null) wishList[key] = wishListLocalStorage[key]
    })
    
    return wishList
}

export default {
    cartItems: getCartItems(),
    wishList: getWishList()
}
/* eslint-enable */
