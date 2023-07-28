import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import { AppProvider } from './context/AppContext';
import BarChart from './BarChart';
import './App.css';
import FetchUser from './components/FetchUser';
import FetchBudget from './components/FetchBudget';
import FetchName from './components/FetchName';
import fetchExpenseCost from './components/FetchExpenseCost';
import totalSpend from './components/TotalSpend';
import './dark-mode.css';

const App = () => {
  const [expenseCostData, setExpenseCostData] = useState([]);

  useEffect(() => {
    fetchExpenseCost()
      .then((data) => {
        // Convert expense_cost values to numbers
        const formattedData = data.map((item) => Number(item.expense_cost));
        setExpenseCostData(formattedData);
      })
      .catch((error) => console.error('Error fetching expense cost:', error));
  }, []);

  return (
    <AppProvider>
      <div className="container">
        <h1 className="mt-3">Welcome to your budget planner, <FetchName /></h1>
        <div className="row mt-3">
          <div>
            <br></br>
            <FetchUser />
            <br></br>
          </div>
          <div className="col-sm">
            <FetchBudget />
          </div>
          <div className="col-sm">
            <Remaining />
          </div>
          <div className="col-sm">
            <ExpenseTotal />
          </div>
        </div>
        <h3 className="mt-3">Your recent expenses</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <ExpenseList />
          </div>
        </div>
        <h3 className="mt-3">Add new expense</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <AddExpenseForm />
          </div>
        </div>
      </div>
      {/* {expenseCostData.length > 0 && ( */}
        <BarChart data={expenseCostData} width={1000} height={500} />
      {/* )} */}
    </AppProvider>
  );
};

export default App;
