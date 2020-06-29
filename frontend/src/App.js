import React, { useState, useContext, useEffect, createContext } from "react";
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

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   },
// };

function PrivateRoute({ children, ...rest }) {
  const isAuth = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        true ? (
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

export const AuthContext = React.createContext();

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("trigger use context");
    axios
      .get("http://localhost:3000/auth/login/success")
      .then((response) => {
        console.log("respond out ");
        if (response.status == 200) return response.json();
        throw new Error("failed to authenticated");
      })
      .then((response) => {
        console.log("set auth true");
        setIsAuth(true);
        setUser(response.user);
      })
      .catch((error) => {
        console.log(error);
        setIsAuth(false);
        setError("Failed to Authenticate");
      });
  });

  return (
    <AuthContext.Provider value={isAuth}>
      <Router>
        <div className="App">
          <Navbar />
        </div>

        {/* the page that swithc */}
        <Switch>
          <Route path="/dashboard">
            <DashboardPage />
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
  );
}

export default App;
