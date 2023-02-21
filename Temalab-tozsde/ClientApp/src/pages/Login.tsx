import * as React from "react";
import { useState, useContext } from "react";
import { Alert, Button } from "react-bootstrap";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import { LoginCredentials } from "../models/loginCredentials.model";
import { UserContext } from "../UserContext";

export const Login = () => {
  const userContext = useContext(UserContext);

  const [loginState, setLoginState] = useState<LoginCredentials>({
    userName: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLoginSuccess(null);
    const value = evt.target.value;
    setLoginState({
      ...loginState,
      [evt.currentTarget.name]: value,
    });
  };

  const renderLoginResult = () => {

    if (loginSuccess && loginState.userName!=="admin") {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/portfolio" replace />} />
        </Routes>
      );
    } else if (
      loginSuccess === false &&
      (loginState.userName === "" || loginState.password === "")
    ) {
      return <Alert variant="danger">Please fill out all fields</Alert>;
    } else if (loginSuccess === false) {
      return <Alert variant="danger">Wrong username or password</Alert>;
    }
    else if(loginSuccess){
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/manageusers" replace />} />
        </Routes>
      );
    }

    else if (loginSuccess === false && (loginState.userName === "" || loginState.password === "")) {
      return <Alert variant="danger">Please fill out all fields</Alert>
    }

    else if (loginSuccess === false) {
      return <Alert variant="danger">Wrong username or password</Alert>
    }
  }

  const login = () => {
    fetch("api/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginState),
    }).then((response) => {
      if (response.status === 200) {
        const jsonPromise = response.json();
        jsonPromise.then((data) => {
          userContext?.setInvestor(data);
          console.log(data);
          setLoginSuccess(true);
        });
      } else {
        console.log("no data passed back");
        setLoginSuccess(false);
      }
    });
  };

  return (
    <div className="Login-container">
      <form className="Login-form">
        <div className="Login-form-content">
          <h1 className="Login-title">Login</h1>
          <div className="login-group">
            <label className="login-labels">Username</label>
            <input
              name="userName"
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label className="login-labels">Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-4">
            <div>{renderLoginResult()}</div>
            <Button className="btn-login" onClick={() => login()}>
              Login
            </Button>
          </div>
          <h6>
            <NavLink to="/register">Register</NavLink>
          </h6>
        </div>
      </form>
    </div>
  );
};
