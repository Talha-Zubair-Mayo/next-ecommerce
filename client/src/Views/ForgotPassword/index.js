import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";
import NextLink from "next/link";
import { validateFields } from "../../../utils/Validtions";
const ForgotPassword = () => {
  const [FormData, setFormData] = useState({
    Email: "",
  });
  const [EmailError, setEmailError] = useState("");
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
    }
  };
  const ValidationHandler = (e) => {
    const { name } = e.target;
    if (name === "Email") {
      // @ts-ignore
      setEmailError(validateFields.validateEmail(FormData.Email));
    }
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    const EmailError = validateFields.validateEmail(FormData.Email);
    if ([EmailError].every((e) => e === false)) {
      alert(JSON.stringify(FormData));
    }
    {
      setEmailError(EmailError);
    }
  };
  return (
    <div>
      <div className={styles.container_ForgotPassword}>
        <div id={styles.wrap_ForgotPassword} className="px-5 py-5 w-80">
          <form onSubmit={SubmitHandler} className={styles.ForgotPassword_form}>
            <span className={styles.ForgotPassword_form_title}>
              {" "}
              Forgot Password{" "}
            </span>
            <div className="py-1">
              <span className="py-2"> Email </span>
              <div className={styles.wrap_input}>
                <input
                  className={styles.input}
                  value={FormData.Email}
                  type="text"
                  onChange={InputHandler}
                  onBlur={ValidationHandler}
                  name="Email"
                />
                <span className={styles.focus_input}></span>
              </div>
              {EmailError && (
                <span className={styles.alert_validate}>{EmailError}</span>
              )}
            </div>

            <div className={`${styles.container_ForgotPassword_form_btn} py-2`}>
              <button type="submit" className={styles.ForgotPassword_form_btn}>
                Send Email
              </button>
            </div>

            <div className="w-full text-center py-3">
              <span className="txt2"> Back To </span>

              <NextLink href="/login">
                <a className={styles.Links}>Sign In</a>
              </NextLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
