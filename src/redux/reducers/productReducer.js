
const initialState = {
  product: [],
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
  orders: JSON.parse(localStorage.getItem('orders')) || [],
  cancelledOrders: JSON.parse(localStorage.getItem('cancelledOrders')) || [],
  productDetails: [],
  upDatedCart: [],
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const productReducer = (state = initialState, action) => {
  let updatedState;
  switch (action.type) {
    case 'FETCH_PRODUCT':
      return { ...state, product: action.payload };

    case 'ADD_TO_CART':
      const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += 1;
        saveToLocalStorage('cart', updatedCart);
        return { ...state, cart: updatedCart };
      } else {
        updatedState = { ...state, cart: [...state.cart, action.payload] };
        saveToLocalStorage('cart', updatedState.cart);
        return updatedState;
      }

    case 'PRODUCT_DETAIL':
      return {
        ...state,
        productDetails: [...state.productDetails, action.payload],
      };

    case 'REMOVE_FROM_CART':
      updatedState = { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
      saveToLocalStorage('cart', updatedState.cart);
      return updatedState;

    case 'UPDATE_QUANTITY':
      updatedState = {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.productId ? { ...item, quantity: action.payload.newQuantity } : item
        ),
      };
      saveToLocalStorage('cart', updatedState.cart);
      return updatedState;

    case 'ADD_TO_WISHLIST':
      if (!state.wishlist.some(item => item.id === action.payload.id)) {
        updatedState = { ...state, wishlist: [...state.wishlist, action.payload] };
        saveToLocalStorage('wishlist', updatedState.wishlist);
        return updatedState;
      }
      return state;

    case 'REMOVE_FROM_WISHLIST':
      updatedState = { ...state, wishlist: state.wishlist.filter(item => item.id !== action.payload) };
      saveToLocalStorage('wishlist', updatedState.wishlist);
      return updatedState;

    case 'PLACE_ORDER':
      updatedState = { ...state, orders: [...state.orders, action.payload] };
      saveToLocalStorage('orders', updatedState.orders);
      return updatedState;

    case 'ADD_CANCELLED_ORDER':
      updatedState = { ...state, cancelledOrders: [...state.cancelledOrders, action.payload] };
      saveToLocalStorage('cancelledOrders', updatedState.cancelledOrders);
      return updatedState;

    case 'REMOVE_ORDER':
      updatedState = { ...state, orders: state.orders.filter((_, index) => index !== action.payload) };
      saveToLocalStorage('orders', updatedState.orders);
      return updatedState;

    default:
      return state;
  }
};

export default productReducer;
