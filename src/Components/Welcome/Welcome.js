import React,{Fragment,useContext} from "react";
import { useHistory } from "react-router-dom";
import classes from './Welcome.module.css';
import AuthContext from "../../Store/auth-context";
import tracker from "../Image/expenses.jpg";



const Welcome=()=>{
    const authCtx=useContext(AuthContext)

    const history=useHistory();
    const onClickHandler=(props)=>{
        history.replace('/profile')

    }
    const logoutHandler=()=>{
        authCtx.logout();
        history.replace("./auth")
    }
    const ExpenseHandler=()=>{
      history.replace('./expenses')

    }



    const verifyHandler = (props) => {
        fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDuvNa4o1FU9bVdjK2VHC-w9hXSFUJbsFo",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: 'VERIFY_EMAIL',
              idToken: authCtx.token,
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
                let errorMessage = "Data could not be fetched";
                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                  }
  
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            console.log("Email is verified");
            console.log(data.email);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    return(
        <Fragment>
            <section className={classes.section}>
            <h1 className={classes.h1}>Welcome to the page.Your logged In</h1>
            <p className={classes.p}>Your profile is Incomplete</p>
            <button className={classes.button} onClick={onClickHandler}>Complete now</button>
            <button className={classes.logout} onClick={logoutHandler}>Logout</button>
        
            </section>
            <section className={classes.verify}>
              <p>Verify your Email now!</p>
              <button className={classes.verifybutton} onClick={verifyHandler}>Click Here</button>
            </section>
            <section className={classes.expenes}>
              <h1 className={classes.verifybutton}>Day to day Expenses</h1>
              <img src={tracker} alt="expenses" className={classes.img}></img>
            </section>
            <button className={classes.buttone} onClick={ExpenseHandler}>Track your expenses now</button>
        </Fragment>
        
    )

}
export default Welcome;
