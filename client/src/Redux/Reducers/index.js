import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./CartReducer";
import UserLoginReducer from "./UserLoginReducer";

const Reducers = {
  CartItems: persistReducer({ key: "CartItems", storage }, cartReducer),
  UserLogin: persistReducer({ key: "UserLogin", storage }, UserLoginReducer),
};

export default Reducers;
