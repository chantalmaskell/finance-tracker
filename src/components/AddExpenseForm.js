import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AddExpenseForm = () => {
  const { dispatch } = useContext(AppContext);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [user_id, setUserid] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    const expense = {
      expense_id: id,
      expense_name: name,
      expense_cost: parseInt(cost),
      user_id: user_id
    };

    try {
      const response = await fetch('http://localhost:5000/addexpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      const addedExpense = await response.json();

      dispatch({
        type: 'ADD_EXPENSE',
        payload: addedExpense
      });

      // Clear form after you submit it
      setId('');
      setName('');
      setCost('');
      setUserid('');
    } catch (error) {
      console.error('Error adding expense:', error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
			<div className='row'>
				<div className='col-sm'>
					<label for='name'>Expense ID</label>
					<input
						required='required'
						type='text'
						className='form-control'
						id='id'
						value={id}
						onChange={(event) => setId(event.target.value)}
					></input>
				</div>
				<div className='col-sm'>
					<label for='cost'>Expense Name</label>
					<input
						required='required'
						type='text'
						className='form-control'
						id='name'
						value={name}
						onChange={(event) => setName(event.target.value)}
					></input>
				</div>
				<div className='col-sm'>
					<label for='cost'>Cost</label>
					<input
						required='required'
						type='text'
						className='form-control'
						id='cost'
						value={cost}
						onChange={(event) => setCost(event.target.value)}
					></input>
				</div>
				<div className='col-sm'>
					<label for='cost'>User ID</label>
					<input
						required='required'
						type='text'
						className='form-control'
						id='user_id'
						value={user_id}
						onChange={(event) => setUserid(event.target.value)}
					></input>
				</div>
				<div className='col-sm'>
					<button type='submit' className='btn btn-primary mt-3'>
						Add
					</button>
				</div>
			</div>
    </form>
  );
};

export default AddExpenseForm;