import React, { Fragment, useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Reset.module.css";

const Reset = (props) => {
  const emailInputRef = useRef();
  const history = useHistory();

  const loginHandler = (props) => {
    history.replace("./auth");
  };
  const resetPasswordHandler = (event) => {
    event.preventDefault();

    const enteredEmails = emailInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDuvNa4o1FU9bVdjK2VHC-w9hXSFUJbsFo",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmails,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Password reset not successful";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("Reset link has been sent to you email");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Fragment>
            <form onSubmit={resetPasswordHandler} className={classes.reset}>
                <div className={classes.control}>
                  <h1 className={classes.h1}>Reset Password</h1>
                    <label htmlFor="email">Entered the email you used to register </label>
                    <input type="email" id="email" ref={emailInputRef}></input>
                    {/* <button>Reset Password</button> */}
                </div>
                
                <button >Reset Password</button>
                <br/>
                
                <button  onClick={loginHandler}>Login again</button>
            </form>
            </Fragment>
  );
};
export default Reset;