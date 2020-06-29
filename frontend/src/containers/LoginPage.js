import React, { useContext } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "../App";
import GoogleButton from "react-google-button";
import Axios from "axios";

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

const LoginPage = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  const isAuth = useContext(AuthContext);

  const signIn = () => {
    // axios.get("http://localhost:3000/auth/google");
    window.open("http://localhost:3000/auth/google", "googleSignIn");
  };

  return (
    <div>
      <h2> this is login</h2>
      <div className="flex justify-center align-middle">
        <div>
          <GoogleButton onClick={signIn} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
