import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import { AppProvider } from './context/AppContext';
import BarChart from './BarChart';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const App = () => {
	const [profileData, setProfileData] = useState(null);

	function getData() {
		axios({
			method: 'GET',
			url: '/profile',
		})
			.then((response) => {
				const res = response.data;
				setProfileData({
					profile_name: res.name,
					about_me: res.about,
				});
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			});
	}

	return (
		<AppProvider>
			<div className="container">
				<h1 className="mt-3">My Budget Planner</h1>
				<div className="row mt-3">
					<div className="col-sm">
						<Budget />
					</div>
					<div className="col-sm">
						<Remaining />
					</div>
					<div className="col-sm">
						<ExpenseTotal />
					</div>
				</div>
				<h3 className="mt-3">Expenses</h3>
				<div className="row mt-3">
					<div className="col-sm">
						<ExpenseList />
					</div>
				</div>
				<h3 className="mt-3">Add Expense</h3>
				<div className="row mt-3">
					<div className="col-sm">
						<AddExpenseForm />
					</div>
				</div>
				<BarChart data={[12, 5, 6, 6, 9, 10]} width={700} height={300} />
				<header className="App-header">
					<p>Click to get </p>
					<button onClick={getData}>Click me</button>
					{profileData && (
						<div>
							<p>Profile name: {profileData.profile_name}</p>
							<p>About me: {profileData.about_me}</p>
						</div>
					)}
				</header>
			</div>
		</AppProvider>
	);
};

export default App;
