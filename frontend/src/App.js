import React, { useState, useContext, useEffect } from "react";
// import './App.css';
import "./styles/tailwind.css";
import Navbar from "./component/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import HomePage from "./containers/HomePage";
import DashboardPage from "./containers/DashboardPage";
import axios from "axios";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/login/success", {
        method: "GET",
        credentials: "included",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        console.log("respond out ");
        if (response.status == 200) return response.json();
        throw new Error("failed to authenticated");
      })
      .then((response) => {
        setIsAuth(true);
        setUser(response.user);
      })
      .catch((error) => {
        console.log(error);
        setIsAuth(false);
        setError("Failed to Authenticate");
      });
    {
    }
  });

  return (
    <Router>
      <div className="App">
        {/* Navigation bar */}
        <Navbar />
      </div>

      {/* the page that swithc */}
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
        <PrivateRoute path="/dashboard">
          <DashboardPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
