import React, { useState, useContext, useEffect, createContext } from 'react';
// import './App.css';
import './styles/tailwind.css';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import UpdatePage from './containers/UpdatePage';
import axios from 'axios';

import DasboardList from './containers/DasboardList';

export const UserContext = React.createContext();
export const AuthContext = React.createContext();

function App() {
	const [ isAuth, setIsAuth ] = useState(false);
	const [ user, setUser ] = useState({});
	const [ error, setError ] = useState(null);

	useEffect(() => {
		console.log('trigger use context');

		async function fetch() {
			const response = await axios.get('http://localhost:3000/auth/login/success', {
				withCredentials: true,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
				}
			});

			if (response.data.success != false) {
				setIsAuth(true);
				setUser(response.data);
			} else {
				setError('Response Failed');
			}
			console.log(response);
		}

		fetch();
	}, []);

	return (
		<UserContext.Provider value={user.user}>
			<AuthContext.Provider value={isAuth}>
				<Router>
					<div className="App">
						<Navbar />
					</div>

					<Switch>
						<Route path="/dashboard/:id" exact >
							<UpdatePage/>
						</Route>
						<Route path="/dashboard">
							<DasboardList />
						</Route>

						<Route path="/login">
							<LoginPage />
						</Route>
						<Route path="/">
							<HomePage />
						</Route>

						{/* <PrivateRoute path="/dashboard">
            <DashboardPage />
          </PrivateRoute> */}
					</Switch>
				</Router>
			</AuthContext.Provider>
		</UserContext.Provider>
	);
}

export default App;
