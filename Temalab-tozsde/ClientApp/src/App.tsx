import React, { useMemo, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Stocks } from "./pages/Stocks";
import { Cryptos } from "./pages/Crypto";
import { Portfolio } from "./pages/Portfolio";
import { Help } from "./pages/Help";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ManageUsers } from "./pages/ManageUsers";
import { Container } from "react-bootstrap";
import "./css-files/styles.css";
import { Investor } from "./models/investor.model";
import { UserContext, IProviderValue } from "./UserContext";
import CustomNavbar from "./components/CustomNavbar";

function App() {
  const [investor, setInvestor] = useState<Investor | null>(null);

  const providerValue = useMemo<IProviderValue>(
    () => ({ investor, setInvestor }),
    [investor, setInvestor]
  );

  return (
    <>
      <Container className="px-0" fluid>
        <UserContext.Provider value={providerValue}>
          <CustomNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/crypto" element={<Cryptos />} />
            {investor != null ? (
              <Route path="/portfolio" element={<Portfolio />} />
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {investor?.userName === "admin" ? (
              <Route path="/manageusers" element={<ManageUsers />} />
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </UserContext.Provider>
      </Container>
    </>
  );
}

export default App;
