import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./CartReducer";

const Reducers = {
  CartItems: cartReducer,
};

export default Reducers;
