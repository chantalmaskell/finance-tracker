import React, { useContext } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';
import './expense-list.css';


const ExpenseList = () => {
	const { expenses } = useContext(AppContext);

	return (
		<ul className='list-group'>
			{expenses.map((expense) => (
				<ExpenseItem id={expense.expense_id} name={expense.name} cost={expense.cost} user_id={expense.user_id}/>
			))}
		</ul>
	);
};

export default ExpenseList;