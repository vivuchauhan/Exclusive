export const fetchProduct = () => async(dispatch) => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const product = await response.json();
        dispatch({
          type: 'FETCH_PRODUCT',
          payload: product,
        })
      } catch (error) {
        console.error('Fetch API error:', error);
      }
};

export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload:{
    ... product,
    quantity: 1,
  }
});

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});

export const productDetail = (productDetails) => ({
  type: 'PRODUCT_DETAIL',
  payload: productDetails,
});

export const updateQuantity = (productId, newQuantity) => ({
  type: 'UPDATE_QUANTITY',
  payload: {
    productId,
    newQuantity,
  },
});

export const addToWishlist = (product) => ({
  type: 'ADD_TO_WISHLIST',
  payload: product,
});

export const removeFromWishlist = (productId) => {
  console.log('Removing from wishlist:', productId);
  return {
    type: 'REMOVE_FROM_WISHLIST',
    payload: productId,
  };
};

export const placeOrder = (formData, totalPrice, productDetails) => {
  return {
    type: 'PLACE_ORDER',
    payload: {
      formData,
      totalPrice,
      productDetails
    },
  };
};

export const addCancelledOrder = (cancelledOrder) => ({
  type: 'ADD_CANCELLED_ORDER',
  payload: cancelledOrder,
});

export const removeOrder = (orderIndex) => {
  return {
    type: 'REMOVE_ORDER',
    payload: orderIndex,
  };
};