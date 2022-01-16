export const API_URL = process.env.NEXT_PUBLIC_API_URL;
import axios from "axios";

// User SignUp API
export const UserSignUpApi = async (Data) => {
  const res = await axios.post(API_URL + "/register", Data);
  return res;
};

// Email Activation API
export const EmailActivationApi = async (activation_token) => {
  const res = await axios.patch(API_URL + "/activateEmail", {
    activation_token,
  });
  return res;
};

// User Sign In API
export const UserSignInApi = async (Data) => {
  const res = await axios.post(API_URL + "/login", Data);
  return res;
};
