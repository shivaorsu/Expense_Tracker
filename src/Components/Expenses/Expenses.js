import React, { Fragment, useRef, useState, useEffect } from "react";

import classes from "./Expenses.module.css";
import axios from "axios";

const Expenses = (props) => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const [amount, setAmount] = useState([]);
  const [desc, setDesc] = useState([]);
  const [category, setCategory] = useState([]);

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

    axios.post(
      "https://tracker-839f1-default-rtdb.firebaseio.com/expense.json",
      obj
    );

    setAmount([...amount, enteredAmount]);
    setDesc([...desc, enteredDescription]);
    setCategory([...category, enteredCategory]);

    console.log(enteredAmount, enteredDescription, enteredCategory);
  };
  useEffect(() => {
    if (performance.navigation.type === 1) {
      console.log("This page is reloaded");
      axios.get(
        "https://expense-118bb-default-rtdb.firebaseio.com/expense.json"
      );
    }
  });

  return (
    <Fragment>
      <h1> Track Your Expenses</h1>
      <form className={classes.form} onSubmit={showUserHandler}>
        <label className={classes.label}>Expense Amount</label>
        <input
          type="number"
          id="amount"
          required
          className={classes.label}
          ref={amountInputRef}
        />
        <label for="description" className={classes.label}>
          Expense Description
        </label>
        <input
          type="text"
          id="description"
          required
          className={classes.label}
          ref={descriptionInputRef}
        />
        <label for="category" className={classes.label}>
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
      <div className={classes.list}>
        <h3 className={classes.list}>{amount}</h3>
        <h3 className={classes.list}>{desc}</h3>
        <h3 className={classes.list}>{category}</h3>
      </div>
    </Fragment>
  );
};

export default Expenses;
