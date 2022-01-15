import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./CartReducer";

const Reducers = {
  CartItems: persistReducer({ key: "CartItems", storage }, cartReducer),
};

export default Reducers;
