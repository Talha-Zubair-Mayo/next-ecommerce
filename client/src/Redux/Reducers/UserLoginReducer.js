import { USER_SIGN_IN_SUCCESS } from "../Constants";
const initialState = {
  data: [],
};

const UserLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default:
      return state;
  }
};

export default UserLoginReducer;
