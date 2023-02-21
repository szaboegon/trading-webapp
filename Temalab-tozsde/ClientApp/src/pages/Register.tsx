import * as React from 'react';
import { useState, useContext } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { RegistrationForm } from "../models/registrationForm.model";
import { UserContext } from '../UserContext';


export const Register = () => {
  const userContext = useContext(UserContext);

  const [registrationState, setRegistrationState] = useState<RegistrationForm>({
    userName: "",
    password: "",
    fullName: "",
    address: "",
    taxNumber: "",
    email: ""
  });

  const [registrationSuccess, setRegistrationSuccess] = useState<boolean | null>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationSuccess(null);
    const value = evt.target.value
    setRegistrationState({
      ...registrationState,
      [evt.currentTarget.name]: value
    });
  }

  function emptyFields(){
    return registrationState.userName === "" || registrationState.password === ""
    || registrationState.fullName==="" || registrationState.address==="" || registrationState.taxNumber===""
    || registrationState.email==="";
  }

  const renderRegistrationResult = () => {

    if (registrationSuccess) {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/portfolio" replace />} />
        </Routes>
      );
    }

    else if (registrationSuccess === false && (emptyFields())) {
      return <Alert variant="danger">Please fill out all fields</Alert>
    }

    else if (registrationSuccess === false) {
      return <Alert variant="danger">The user is already existing</Alert>
    }
  }

  const registration = () => {
    if(emptyFields()){
      console.log("emptyfields");
      setRegistrationSuccess(false)
      return;
    }


    fetch('api/registration', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationState)
    })
      .then(response => {
        if (response.status === 200) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            userContext?.setInvestor(data);
            console.log(data);
            setRegistrationSuccess(true)
          });
        }
        else {
          console.log("no data passed back");
          setRegistrationSuccess(false)
        }
      });
  }
  

  return (
    <div className="Registration-container">
      <form className="Registration-form">
        <div className="Registration-form-content">
          <h1 className="Registration-title">Registration</h1>
          <div className="form-group mt-3">
            <label className="Registration-labels">Full name</label>
            <input
              name='fullName'
              type="text"
              className="form-control mt-1"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label className="Registration-labels">Tax number</label>
            <input
              name='taxNumber'
              type="text"
              className="form-control mt-1"
              placeholder="Enter your tax number"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label className="Registration-labels">Address</label>
            <input
              name='address'
              type="text"
              className="form-control mt-1"
              placeholder="Enter your address"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label className="Registration-labels">E-mail</label>
            <input
              name='email'
              type="email"
              className="form-control mt-1"
              placeholder="Enter your e-mail"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label className="Registration-labels">Username</label>
            <input
              name='userName'
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label className="Registration-labels">Password</label>
            <input
              name='password'
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-4">
          <div>{renderRegistrationResult()}</div>
            <Button className="btn-registration" onClick={()=>registration()}>
              Register
            </Button>
          </div>
          <h6>
            <NavLink to="/login">
              Already have an account?
            </NavLink>
          </h6>
        </div>
      </form>
    </div>
  );
};