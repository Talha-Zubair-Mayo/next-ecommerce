import {
  Cart_Add_Item,
  Cart_Remove_Item,
  Cart_Shipping_Address,
  CART_SAVE_PAYMENT_METHOD,
} from "../Constants";
export const addToCart = (product, qty) => async (dispatch) => {
  // const { data } = await axios.get(`http://localhost:8080/api/products/${id}`);
  dispatch({
    type: Cart_Add_Item,
    payload: {
      _id: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      InStock: product.InStock,
      qty,
    },
  });

  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// export const saveShippingAddress = (data) => (dispatch) => {
//   dispatch({ type: Cart_Shipping_Address, payload: data });
//   localStorage.setItem("shippingAddress", JSON.stringify(data));
// };

// export const savePaymentMethod = (data) => (dispatch) => {
//   dispatch({
//     type: CART_SAVE_PAYMENT_METHOD,
//     payload: data,
//   });
//   localStorage.setItem("paymentMethod", JSON.stringify(data));
// };
