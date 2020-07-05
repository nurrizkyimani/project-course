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
import Cookies from "js-cookie";
import DasboardList from "./containers/DasboardList";

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

    async function fetch() {
      const response = await axios.get(
        "http://localhost:3000/auth/login/success",
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      );

      if (response.data.success != false) {
        setIsAuth(true);
        setUser(response.data);
      } else {
        setError("Response Failed");
      }
      console.log(response);
    }

    fetch();
  }, []);

  return (
    <AuthContext.Provider value={isAuth, user}>
      <Router>
        <div className="App">
          <Navbar />
        </div>

        {/* the page that swithc */}
        <Switch>
          <Route path="/dashlist">
            <DasboardList />
          </Route>
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
