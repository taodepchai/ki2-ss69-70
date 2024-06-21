import { CartItem, Product } from "../../components/types";
  interface AppState {
    products: Product[];
    cart: CartItem[];
  }
  
  const initialState: AppState = {
    products: [
      {
          id: 1, name: 'Pizza', price: 30, quantity: 10, img: 'https://i.pinimg.com/originals/16/1b/6e/161b6e65579a5f61f574e5397ceb7d41.png',
          description: 'abcd'
      },
      {
          id: 2, name: 'Hamburger', price: 15, quantity: 5, img: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/1:1/w_1920,c_limit/the-ultimate-hamburger.jpg',
          description: 'abcd'
      },
      {
          id: 3, name: 'Bread', price: 20, quantity: 8, img: 'https://3.bp.blogspot.com/-ewkBtdm1qNQ/WJFw1JbxUII/AAAAAAAAfGM/3LOpmSm2AbQ3zjGC9Yu4jkk6NMtY8OHpgCLcB/s1600/french_bread_2.jpg',
          description: 'abcd'
      },
      {
          id: 4, name: 'Cake', price: 10, quantity: 7, img: 'https://i.pinimg.com/originals/26/6d/90/266d909adf30530bd9acb62ece71f824.jpg',
          description: 'abcd'
      },
    ],
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  };  
  function reducer(state = initialState, action: any): AppState {
    switch (action.type) {
      case 'ADD_TO_CART':
        const product = state.products.find((p) => p.id === action.payload.id);
        const cartItem = state.cart.find((item) => item.id === product!.id);
        if (cartItem) {
          if (cartItem.quantity + 1 > product!.quantity) {
            alert('Số lượng sản phẩm vượt quá số lượng trong kho');
            return state;
          }
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === product!.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return {
          ...state,
          cart: [...state.cart, { ...product!, quantity: 1 }],
        };
      case 'UPDATE_CART':
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      case 'DELETE_FROM_CART':
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      case 'CLEAR_CART':
        return {
          ...state,
          cart: [],
        };
      default:
        return state;
    }
  }

  export default reducer;