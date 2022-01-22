export const API_URL = process.env.NEXT_PUBLIC_API_URL;
import axios from "axios";

let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const config = {};
if (token) {
  config.headers = { Authorization: token };
}

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

// Forgot Password API
export const ForgotPasswordApi = async (Data) => {
  const res = await axios.post(API_URL + "/forgotPassword", Data);
  return res;
};

// Reset Passowrd Api

export const ResetPasswordApi = async (Data, activationCode) => {
  config.headers = { Authorization: activationCode };
  const res = await axios.patch(API_URL + "/resetpassword", Data, config);
  return res;
};

// Login With Google
export const LoginWithGoogleApi = async (Data) => {
  const res = await axios.post(API_URL + "/googleLogin", {
    tokenId: Data,
  });
  return res;
};

// Login  With Facebook

export const LoginWithFacebookApi = async (Data) => {
  const res = await axios.post(API_URL + "/facebookLogin", Data);
  return res;
};
