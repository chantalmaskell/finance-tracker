import { createContext, useReducer } from "react";
import { useEffect } from 'react';
import fetchExpenses from '../components/FetchExpenses';

const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return {
				...state,
				expenses: [...state.expenses, action.payload],
			};
		case 'DELETE_EXPENSE':
			return {
				...state,
				expenses: state.expenses.filter(
					(expense) => expense.id !== action.payload
				),
			};
		case 'SET_EXPENSES':
			return {
				...state,
				expenses: action.payload
			};
		default:
			return state;
	}
};

const initialState = {
	budget: 1000,
	expenses: [
		{ id: 12, name: 'Netflix', cost: 10.99 },
		{ id: 13, name: 'Council tax', cost: 170 },
		{ id: 14, name: 'Rent', cost: 525 },
	],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	useEffect(() => {
		fetchExpenses(dispatch);
	  }, []);

	  const removeExpense = (expenseId) => {
		dispatch({ type: 'DELETE_EXPENSE', payload: expenseId });
	  };

	return (
		<AppContext.Provider
			value={{
				budget: state.budget,
				expenses: state.expenses,
				dispatch,
				removeExpense,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};