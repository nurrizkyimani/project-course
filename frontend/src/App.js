import React from 'react';
// import './App.css';
import './styles/tailwind.css'
import Navbar from './component/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import DashboardPage from './containers/DashboardPage';



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
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <div className="App">
          <Navbar>
       
        

          </Navbar>
      </div>

    <Switch>
      <Route path="/login">
        <LoginPage/>
      </Route>
      <Route path="/">
        <HomePage/>
      </Route>

      <PrivateRoute path="/protected">
            <DashboardPage/>
          </PrivateRoute>
    </Switch>

    </Router>
  );
}

export default App;
