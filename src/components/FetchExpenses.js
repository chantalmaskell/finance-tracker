const fetchExpenses = async (dispatch) => {
  try {
      const response = await fetch('http://localhost:5000/getexpenses');

      if (!response.ok) {
          throw new Error('Failed to fetch expenses');
      }

      const expenses = await response.json();

      // Map the backend column names to frontend property names
      const formattedExpenses = expenses.map((expense) => ({
          id: expense.expense_id,
          name: expense.expense_name,
          cost: expense.expense_cost,
          user_id: expenses.user_id,
      }));

      dispatch({
          type: 'SET_EXPENSES',
          payload: formattedExpenses,
      });
  } catch (error) {
      console.error('Error fetching expenses:', error.message);
  }
};

export default fetchExpenses;
