import React from "react";
import NextLink from "next/link";
import styles from "./ThankYouPage.module.scss";
const ThankYou = ({ isSuccess }) => {
  return (
    <div className={styles.container_ThankYou}>
      <div id={styles.wrap_ThankYou} className="px-5 py-5 w-80">
        {isSuccess ? (
          <>
            <i
              style={{ fontSize: "80px", color: "green" }}
              className="bx bx-check-circle"></i>
            <span className={styles.ThankYou_form_title}> Thank You </span>
            <div className="py-1">
              <p>Account Activation Successfull Please Login</p>
            </div>
          </>
        ) : (
          <>
            <i
              style={{ fontSize: "80px", color: "red" }}
              className="bx bx-error-circle"></i>
            <span className={styles.ThankYou_form_title}> We're Sorry </span>
            <div className="py-1">
              <p>We're Not Able To Confrim Your Account Please Try Again</p>
            </div>
          </>
        )}

        <div className="w-full text-center py-3">
          <span className="txt2"> Back To </span>

          <NextLink href="/login">
            <a className={styles.Links}>Sign In</a>
          </NextLink>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
