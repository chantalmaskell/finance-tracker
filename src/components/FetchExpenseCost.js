const fetchExpenseCost = async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5000/expensecost');
        console.log(response)
  
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
  
        const expenses = await response.json();
  
        // Map the backend column names to frontend property names
        const formattedExpenses = expenses.map((expense) => ({
            cost: expense.expense_cost,
        }));
  
        dispatch({
            type: 'SET_EXPENSES',
            payload: formattedExpenses,
        });
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
    }
  };
  
  export default fetchExpenseCost;
  