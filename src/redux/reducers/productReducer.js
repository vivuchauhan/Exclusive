
const initialState = {
    product: [],
    cart: [],
    productDetails: [],
    upDatedCart:[],
    wishlist: [],
    orders: [],
    cancelledOrders: [],
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCT':
        return {
          ...state,
          product: action.payload,
        };
      case 'ADD_TO_CART':
        const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);
        if (existingProductIndex !== -1) {
          const updatedCart = [...state.cart];
          updatedCart[existingProductIndex].quantity += 1;
          return {
            ...state,
            cart: updatedCart,
          };
        } else {
          return {
            ...state,
            cart: [...state.cart, action.payload],
          };
        }
      case 'PRODUCT_DETAIL':
        return {
          ...state,
          productDetails: [...state.productDetails, action.payload],
        };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload),
        };

      case 'UPDATE_QUANTITY':
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.productId
              ? { ...item, quantity: action.payload.newQuantity }
              : item
          ),
        };
      case 'ADD_TO_WISHLIST':
        const isProductInWishlist = state.wishlist.some((item) => item.id === action.payload.id);
        if (!isProductInWishlist) {
          return {
            ...state,
            wishlist: [...state.wishlist, action.payload],
          };
        } else {
        return state; 
      }
      case 'REMOVE_FROM_WISHLIST':
        console.log('Reducer - Removing from wishlist:', action.payload);
        return {
          ...state,
          wishlist: state.wishlist.filter((item) => item.id !== action.payload),
        };
      case 'PLACE_ORDER':
        return {
          ...state,
          orders: [...state.orders, action.payload]
        };

      case 'ADD_CANCELLED_ORDER':
        return {
          ...state,
          cancelledOrders: [...state.cancelledOrders, action.payload],
        };
      
      case 'REMOVE_ORDER':
        return {
          ...state,
          orders: state.orders.filter((order, index) => index !== action.payload),
        };

      default:
        return state;
    }
  };
  
  export default productReducer;