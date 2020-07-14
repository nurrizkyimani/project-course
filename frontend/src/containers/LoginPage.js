import React, { useContext } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import { AuthContext } from '../App';
import GoogleButton from 'react-google-button';
import Axios from 'axios';

import { GoogleLogout } from 'react-google-login';

const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		fakeAuth.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		fakeAuth.isAuthenticated = false;
		setTimeout(cb, 100);
	}
};

const LoginPage = () => {
	let history = useHistory();
	let location = useLocation();
	let { from } = location.state || { from: { pathname: '/' } };
	let login = () => {
		fakeAuth.authenticate(() => {
			history.replace(from);
		});
	};

	const isAuth = useContext(AuthContext);

	async function logout2() {
		const response = await axios.get('http://localhost:3000/auth/logout', {
			withCredentials: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
			}
		});

		console.log(response);
	}

	const logout = () => {
		console.log('donzo ');
		axios.get('http://localhost:3000/auth/logout');

		// localhost:3000/review

		console.log('lgout done');
	};
	const signIn = () => {
		// axios.get("http://localhost:3000/auth/google");
		window.open('http://localhost:3000/auth/google', 'googleSignIn');
	};
	console.log('clg isauth');
	console.log(isAuth);

	return (
		<div className="bg-gray-200 min-h-screen flex flex-col ">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-5 text-3xl text-center">Sign up</h1>
          <div className="flex justify-center align-middle">
            <div>
              {' '}
              {isAuth ? (
                <GoogleLogout
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="Bitch Logout"
                  onClick={logout2()}
                />
              ) : (
                <GoogleButton onClick={signIn} />
              )}
            </div>
          </div>

			
					<div className="text-center text-sm text-grey-dark mt-4">
						By signing up, you agree to the
						<a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
							Terms of Service
						</a>{' '}
						and
						<a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
							Privacy Policy
						</a>
					</div>
				</div>


			</div>

			
		</div>
	);
};

export default LoginPage;
