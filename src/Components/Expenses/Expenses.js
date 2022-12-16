import React, { Fragment, useEffect, useRef, useState } from "react";

import classes from "./Expenses.module.css";

import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expense.slice";
import { themeActions } from "../../Store/theme.slice";
import ShowExpense from "./ShowExpense";
import { useHistory } from "react-router-dom";

const Expenses = (props) => {
    const amountInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const totalPrice = useSelector((state) => state.expense.totalAmount);
    const darkMode = useSelector((state) => state.theme.darkMode);
  
    const [premium, setPremium] = useState(false);
    const [download, setDownload] = useState(false);
  
    let email = localStorage.getItem("email").replace(".", "").replace("@", "");
    
    console.log(email);
  
    const allExpenses = useSelector((state) => state.expense.expenses);
    function makeCSV(rows) {
      return rows
        .map((r) => `${r.amount} ${r.description} ${r.category}`)
        .join("\n");
    }
  
    useEffect(() => {
      if (!allExpenses.length) {
        return;
      }
      console.log(allExpenses);
      const a1 = document.getElementById("a1");
     
      if (!a1) {
        return;
      }
      const blob = new Blob([makeCSV(allExpenses)]);
      a1.href = URL.createObjectURL(blob);
    }, [allExpenses]);
  
    const onClick = () => {
      
      
        dispatch(themeActions.changeTheme());
      
    
    };
  
    const premiumHandler = () => {
      setPremium(false);
      localStorage.setItem("premium", premium);
      setDownload(true);
    };
  
    const prem = localStorage.getItem("premium");
  
    useEffect(() => {
      if (prem) {
        setPremium(false);
        setDownload(true);
      }
    }, [prem]);
  
    const showUserHandler = (event) => {
      event.preventDefault();
  
      const enteredAmount = amountInputRef.current.value;
      const enteredDescription = descriptionInputRef.current.value;
      const enteredCategory = categoryInputRef.current.value;
  
      const obj = {
        amount: enteredAmount,
        description: enteredDescription,
        category: enteredCategory,
      };
  
      fetch(
        `https://expense-118bb-default-rtdb.firebaseio.com/${email}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            ...obj,
          }),
        }
      ).then(async (res) => {
        const data = await res.json();
        
        dispatch(
          expenseActions.addExpense({
            id: data.name,
            amount: obj.amount,
            description: obj.description,
            category: obj.category,
          })
        );
      });
  
      if (totalPrice > 10000) {
        console.log("Premium Activated");
        setPremium(true);
      }
    };
  
    useEffect(() => {
      if (totalPrice > 10000) {
        setPremium(true);
      } else localStorage.removeItem("premium");
    }, [totalPrice]);
  
    const homeHandler = () => {
      history.replace('./welcome')
    }
  
    return (
      <Fragment>
        <div className={classes.header}>
          <h1> Track Your Expenses</h1>
          <button className={classes.home} onClick={homeHandler}>Go to home page</button>
        </div>
        {download && <h3>Premium Features Activated</h3>}
        {download && (
          <button
            className={`btn ${darkMode ? "btn-dark" : "btn-light"}`}
            onClick={onClick}
          >
            
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button> 
        )}
  
        <form className={classes.form} onSubmit={showUserHandler}>
          <label className={classes.label}>Expense Amount</label>
          <input
            type="number"
            id="amount"
            required
            className={classes.label}
            ref={amountInputRef}
          />
          <label htmlFor="description" className={classes.label}>
            Expense Description
          </label>
          <input
            type="text"
            id="description"
            required
            className={classes.label}
            ref={descriptionInputRef}
          />
          <label htmlFor="category" className={classes.label}>
            Choose Category
          </label>
          <select
            name="category"
            id="category"
            className={classes.label}
            ref={categoryInputRef}
          >
            <option value="investment">Investment</option>
            <option value="food">Food</option>
            <option value="grocery">Grocery</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <button id="submit">Add expense </button>
        </form>
        <hr></hr>
        <h1> Your Expenses for the month</h1>
        <div className={classes.list}>
          <h3 className={classes.list}>Your Amount </h3>
          <h3 className={classes.list}>Description </h3>
          <h3 className={classes.list}>Category </h3>
        </div>
        <ShowExpense />
        <h2> Total amount {totalPrice} </h2>
  
        {premium && !prem && (
          <button className={classes.premium} onClick={premiumHandler}>
            Activate premium
          </button>
        )}
  
        {download && ( <a id="a1" download="expenses.csv">Download Expenses (.csv file) </a>
        )}
      </Fragment>
    );
  };
  
  export default Expenses;