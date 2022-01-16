import React, { useEffect, useState } from "react";
import styles from "./ResetPassowrd.module.scss";
import NextLink from "next/link";
import { validateFields } from "../../../utils/Validtions";
import { ResetPasswordApi } from "../../Redux/api";
import { toast } from "react-toastify";
const ResetPassowrd = ({ activationCode }) => {
  const [FormData, setFormData] = useState({
    Password: "",
    CPassword: "",
  });
  const [PasswordError, setPasswordError] = useState("");
  const [CPasswordError, setCPasswordError] = useState("");
  const InputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    if (name === "Password") {
      setPasswordError(validateFields.RegistervalidatePassword(value));
    } else if (name === "CPassword") {
      setCPasswordError(
        validateFields.ConfirmPassWord(FormData.Password, value)
      );
    }
  };
  const ValidationHandler = (e) => {
    const { name } = e.target;
    if (name === "Password") {
      // @ts-ignore
      setPasswordError(
        validateFields.RegistervalidatePassword(FormData.Password)
      );
    } else if (name === "CPassword") {
      // @ts-ignore
      setCPasswordError(
        validateFields.ConfirmPassWord(FormData.Password, FormData.CPassword)
      );
    }
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    const Payload = {
      password: FormData.Password,
      cf_password: FormData.CPassword,
    };
    const PasswordError = validateFields.RegistervalidatePassword(
      FormData.Password
    );
    const CPasswordError = validateFields.ConfirmPassWord(
      FormData.Password,
      FormData.CPassword
    );
    if ([PasswordError, CPasswordError].every((e) => e === false)) {
      ResetPasswordApi(Payload, activationCode)
        .then((res) => {
          toast.success("Password Reset Successfully");
        })
        .catch((err) => {});
    }
    {
      setPasswordError(PasswordError);
      setCPasswordError(CPasswordError);
    }
  };
  return (
    <div>
      <div className={styles.container_ResetPassword}>
        <div id={styles.wrap_ResetPassword} className="px-5 py-5 w-80">
          <form onSubmit={SubmitHandler} className={styles.ResetPassword_form}>
            <span className={styles.ResetPassword_form_title}>
              {" "}
              Reset Passowrd{" "}
            </span>

            <div className="py-1">
              <span className="py-2"> Password </span>

              <div className={styles.wrap_input}>
                <input
                  className={styles.input}
                  type="password"
                  onChange={InputHandler}
                  onBlur={ValidationHandler}
                  name="Password"
                  value={FormData.Password}
                />
                <span className={styles.focus_input}></span>
              </div>
              {PasswordError && (
                <span className={styles.alert_validate}>{PasswordError}</span>
              )}
            </div>

            <div className="py-1">
              <span className="py-2">Confirm Password </span>

              <div className={styles.wrap_input}>
                <input
                  className={styles.input}
                  type="password"
                  onChange={InputHandler}
                  onBlur={ValidationHandler}
                  name="CPassword"
                  value={FormData.CPassword}
                />
                <span className={styles.focus_input}></span>
              </div>
              {CPasswordError && (
                <span className={styles.alert_validate}>{CPasswordError}</span>
              )}
            </div>

            <div className={`${styles.container_ResetPassword_form_btn} py-2`}>
              <button type="submit" className={styles.ResetPassword_form_btn}>
                Reset Passowrd
              </button>
            </div>

            <div className="w-full text-center py-3">
              <span className="txt2"> Back to</span>

              <NextLink href="/login">
                <a className={styles.Links}> {""}Sign In </a>
              </NextLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassowrd;
