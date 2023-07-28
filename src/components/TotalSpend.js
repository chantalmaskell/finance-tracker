import React, { useState, useEffect } from "react";

import fetchExpenses from "./FetchExpenses";

function calculateTotalCost(expenseItems) {
  let totalCost = 0;

  for (const item of expenseItems) {
    totalCost += item.expense_cost;
  }

  return totalCost;
}

const TotalSpend = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Call the fetchExpenses function to get the data from the database
    fetchExpenses()
      .then((expenseItems) => {
        // Calculate the total cost using the fetched data
        const totalCost = calculateTotalCost(expenseItems);
        setTotalExpenses(totalCost);
        console.log(totalExpenses)
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  return (
    <div className='alert alert-primary'>
      <span>You HAVE SPENT: £{totalExpenses}</span>
    </div>
  );
};

export default TotalSpend;