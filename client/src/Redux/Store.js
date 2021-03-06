import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./Reducers/CartReducer";

const reducer = combineReducers({
  CartItems: cartReducer,
});

const initialState = {
  cart: {
    cartItems: [],
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  // initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
