import React, { useEffect, useState } from "react";
import styles from "./SignUp.module.scss";
import NextLink from "next/link";
import { validateFields } from "../../../utils/Validtions";
import PhoneInput from "react-phone-input-2";
import { UserSignUpApi } from "../../Redux/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const SignUp = () => {
  const router = useRouter();
  const [FormData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
    CPassword: "",
    Phone: "",
  });
  const [FullNameError, setFullNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [CPasswordError, setCPasswordError] = useState("");
  const [PhoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const InputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    if (name === "FullName") {
      // @ts-ignore
      setFullNameError(validateFields.validateFullName(value));
    } else if (name === "Email") {
      // @ts-ignore
      setEmailError(validateFields.validateEmail(value));
    } else if (name === "Password") {
      setPasswordError(validateFields.RegistervalidatePassword(value));
    } else if (name === "CPassword") {
      setCPasswordError(
        validateFields.ConfirmPassWord(FormData.Password, value)
      );
    }
  };
  const ValidationHandler = (e) => {
    const { name } = e.target;
    if (name === "FullName") {
      // @ts-ignore
      setFullNameError(validateFields.validateFullName(FormData.FullName));
    } else if (name === "Email") {
      // @ts-ignore
      setEmailError(validateFields.validateEmail(FormData.Email));
    } else if (name === "Password") {
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
      fullname: FormData.FullName,
      email: FormData.Email,
      password: FormData.Password,
      phone: FormData.Phone,
    };
    const FullNameError = validateFields.validateFullName(FormData.FullName);
    const EmailError = validateFields.validateEmail(FormData.Email);
    const PasswordError = validateFields.RegistervalidatePassword(
      FormData.Password
    );
    const CPasswordError = validateFields.ConfirmPassWord(
      FormData.Password,
      FormData.CPassword
    );
    const PhoneError = validateFields.validatePhoneNumber(FormData.Phone);
    if (
      [
        FullNameError,
        EmailError,
        PasswordError,
        CPasswordError,
        PhoneError,
      ].every((e) => e === false)
    ) {
      setIsLoading(true);
      UserSignUpApi(Payload)
        .then((res) => {
          toast.success(res.data.msg);
          setTimeout(() => {
            router.push("/login");
          }, 2000);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
          setIsLoading(false);
        });
    }
    {
      setFullNameError(FullNameError);
      setEmailError(EmailError);
      setPasswordError(PasswordError);
      setCPasswordError(CPasswordError);
      setPhoneError(PhoneError);
    }
  };
  return (
    <div>
      <div className={styles.container_SignUp}>
        <div id={styles.wrap_SignUp} className="px-5 py-5 w-80">
          <form onSubmit={SubmitHandler} className={styles.SignUp_form}>
            <span className={styles.SignUp_form_title}> Sign Up </span>
            <div className="py-1">
              <span className="py-2"> Full Name </span>
              <div className={styles.wrap_input}>
                <input
                  className={styles.input}
                  value={FormData.FullName}
                  type="text"
                  onChange={InputHandler}
                  onBlur={ValidationHandler}
                  name="FullName"
                />
                <span className={styles.focus_input}></span>
              </div>
              {FullNameError && (
                <span className={styles.alert_validate}>{FullNameError}</span>
              )}
            </div>

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

            <div className="py-1">
              <span className="py-2"> Phone </span>
              <div className={styles.wrap_input}>
                {/* <input
                  className={styles.input}
                  value={FormData.Phone}
                  type="number"
                  onChange={InputHandler}
                  onBlur={ValidationHandler}
                  name="Phone"
                /> */}
                <PhoneInput
                  country="pk"
                  value={FormData.Phone}
                  countryCodeEditable={false}
                  onChange={(phone) => {
                    setFormData((prevState) => {
                      return { ...prevState, Phone: phone };
                    });
                    setPhoneError(validateFields.validatePhoneNumber(phone));
                  }}
                  disableDropdown={false}
                  inputClass={styles.input}
                  placeholder="Phone Number"
                />
                <span className={styles.focus_input}></span>
              </div>
              {PhoneError && (
                <span className={styles.alert_validate}>{PhoneError}</span>
              )}
            </div>
            {isLoading ? (
              <div className={`${styles.container_SignUp_form_btn} py-2`}>
                <button disabled className={styles.SignUp_form_btn}>
                  Sign Up
                </button>
              </div>
            ) : (
              <div className={`${styles.container_SignUp_form_btn} py-2`}>
                <button type="submit" className={styles.SignUp_form_btn}>
                  Sign Up
                </button>
              </div>
            )}

            <div className="w-full text-center py-3">
              <span className="txt2"> Already Registered? </span>

              <NextLink href="/login">
                <a className={styles.Links}>Sign In now</a>
              </NextLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
