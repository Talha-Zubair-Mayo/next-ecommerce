import React, { useState } from "react";
import styles from "./Login.module.scss";
import NextLink from "next/link";
import { validateFields } from "../../../utils/Validtions";
const Login = () => {
  const [FormData, setFormData] = useState({
    Email: "",
    Password: "",
  });
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
    const EmailError = validateFields.validateEmail(FormData.Email);
    const PasswordError = validateFields.validatePassword(FormData.Password);
    if ([EmailError, PasswordError].every((e) => e === false)) {
      alert("Login Successfully");
    } else {
      setEmailError(EmailError);
      setPasswordError(PasswordError);
    }
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

              <button className={styles.btn_google}>
                <i className="bx bxl-google"></i>
                Google
              </button>
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

              <a href="#" className={styles.Links}>
                Forgot?
              </a>
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
};

export default Login;
