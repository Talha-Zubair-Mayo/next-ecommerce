import {
  Cart_Add_Item,
  Cart_Remove_Item,
  Cart_Shipping_Address,
  CART_SAVE_PAYMENT_METHOD,
} from "../Constants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case Cart_Add_Item:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case Cart_Remove_Item:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };
    case Cart_Shipping_Address:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
