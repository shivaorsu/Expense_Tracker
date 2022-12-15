import { useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem.js";

const ShowExpense = (props) => {
  const showExpense = useSelector((state) => state.expense.expenses);
  return (
    <ul>
      {showExpense.map((item) => (
        <ExpenseItem

          item={{

            id: item.id,
            amount: item.amount,
            description: item.description,
            category: item.category,
          }}

        />
      ))}
    </ul>
  );
};

export default ShowExpense;