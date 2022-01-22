import React, { useState } from "react";
import styles from "./Login.module.scss";
import GoogleLogin from "react-google-login";
import NextLink from "next/link";
import { validateFields } from "../../../utils/Validtions";
import { UserSignInApi, LoginWithGoogleApi } from "../../Redux/api";
import { useDispatch } from "react-redux";
import { USER_SIGN_IN_SUCCESS } from "../../Redux/Constants";
import { toast } from "react-toastify";
import FacebookLogin from "react-facebook-login";
function Login() {
  const dispatch = useDispatch();
  const [FormData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [IsLoading, setIsLoading] = useState(false);
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const InputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    if (name === "Email") {
      // @ts-ignore
      setEmailError(validateFields.validateEmail(value));
    } else if (name === "Password") {
      setPasswordError(validateFields.validatePassword(value));
    }
  };
  const ValidationHandler = (e) => {
    const { name } = e.target;
    if (name === "Email") {
      // @ts-ignore
      setEmailError(validateFields.validateEmail(FormData.Email));
    } else if (name === "Password") {
      // @ts-ignore

      setPasswordError(validateFields.validatePassword(FormData.Password));
    }
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    const PayLoad = {
      email: FormData.Email,
      password: FormData.Password,
    };
    const EmailError = validateFields.validateEmail(FormData.Email);
    const PasswordError = validateFields.validatePassword(FormData.Password);
    if ([EmailError, PasswordError].every((e) => e === false)) {
      UserSignInApi(PayLoad)
        .then((res) => {
          toast.success(res.data.msg);
          dispatch({
            type: USER_SIGN_IN_SUCCESS,
            payload: res.data.data,
          });
          localStorage.setItem("token", res.data.data.token);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
        });
    } else {
      setEmailError(EmailError);
      setPasswordError(PasswordError);
    }
  };
  const responseGoogle = (response) => {
    // await dispatch(GoogleLoginAction(response.tokenId));
    LoginWithGoogleApi(response.tokenId).then((res) => {
      toast.success(res.data.msg);
      dispatch({
        type: USER_SIGN_IN_SUCCESS,
        payload: res.data.data,
      });
      localStorage.setItem("token", res.data.data.token);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    });
    // .catch((err) => {
    //   // toast.error(err?.response?.data?.msg);
    //   console.log(err.response);
    // });
  };

  return (
    <div>
      <div className={styles.container_login100}>
        <div id={styles.wrap_login} className="px-5 py-5 w-80">
          <form onSubmit={SubmitHandler} className={styles.login_form}>
            <span className={styles.login_form_title}> Sign In With </span>

            <div className="d-flex">
              <button className={styles.btn_face}>
                <i className="bx bxl-facebook"></i>
                Facebook
              </button>
             
              <GoogleLogin
                clientId={process.env.NEXT_PUBLIC_Client_ID}
                buttonText="Login With Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                className={styles.btn_google}
              />
            </div>

            <div className="py-3">
              <span className="py-2"> Email </span>
              <div className={styles.wrap_input}>
                <input
                  className={styles.input}
                  onChange={InputHandler}
                  type="text"
                  name="Email"
                  value={FormData.Email}
                  onBlur={ValidationHandler}
                />
                <span className={styles.focus_input}></span>
              </div>
              {EmailError && (
                <span className={styles.alert_validate}>{EmailError}</span>
              )}
            </div>

            <div className="py-3">
              <span className="py-2"> Password </span>

              <NextLink href="/forgot-password">
                <a className={styles.Links}>Forgot?</a>
              </NextLink>
              <div className={styles.wrap_input}>
                <input
                  className={styles.input}
                  onChange={InputHandler}
                  type="password"
                  name="Password"
                  onBlur={ValidationHandler}
                  value={FormData.Password}
                />
                <span className={styles.focus_input}></span>
              </div>
              {PasswordError && (
                <span className={styles.alert_validate}>{PasswordError}</span>
              )}
            </div>

            <div className={styles.container_login_form_btn}>
              <button type="submit" className={styles.login_form_btn}>
                Sign In
              </button>
            </div>

            <div className="w-full text-center py-3">
              <span className="txt2"> Not a member? </span>

              <NextLink href="/signup">
                <a className={styles.Links}>Sign up now</a>
              </NextLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
