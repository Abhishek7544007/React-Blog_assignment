import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import SignUp from "./components/signup/signup";
import ErrorBoundary from "./helper/Error";
import { getUser } from "./services/UserService";

export default function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    authStateChanged();
  }, []);

  const authStateChanged = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserAuthenticated(true);
      const response = await getUser();
      setUser(response.data);
    } else {
      setUserAuthenticated(false);
      setUser(null);
    }
  };
  return (
    <div>
      <BrowserRouter>
        <ErrorBoundary>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                userAuthenticated ? (
                  <Home user={user} authState={authStateChanged} {...props} />
                ) : (
                  <Login />
                )
              }
            />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}
