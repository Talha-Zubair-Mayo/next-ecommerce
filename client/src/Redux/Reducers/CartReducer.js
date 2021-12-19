import {
  Cart_Add_Item,
  Cart_Remove_Item,
  Cart_Shipping_Address,
  CART_SAVE_PAYMENT_METHOD,
} from "../Constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddres: {} },
  action
) => {
  switch (action.type) {
    case Cart_Add_Item:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
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
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
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
