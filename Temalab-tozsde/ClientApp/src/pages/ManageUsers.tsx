import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import InvestorList from "../components/InvestorList";
import { Investor } from "../models/investor.model";
import { UserContext } from "../UserContext";

export const ManageUsers = () => {
  const userContext = useContext(UserContext);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [investorChanged, setInvestorChanged] = useState(false);

  const investorChangedListener = () => {
    setInvestorChanged((investorChanged) => !investorChanged);
  };

  useEffect(() => {
    getInvestors();
  }, [investorChanged]);

  const getInvestors = () => {
    if (userContext?.investor?.userName === "admin") {
      fetch("api/investors")
        .then((response) => response.json())
        .then((data) => {
          setInvestors(data);
        });
    }
  };

  return (
    <>
      <Container className="px-0" fluid>
        <Container fluid className="page-header">
          <Row className="justify-content-center">
            <Col className="mt-5" align="start" lg={8} md={10} sm={12}>
              <h1 className="text-dark">Manage Users</h1>
              <h3 className="sub-header">Track and manage user information</h3>
            </Col>
          </Row>
        </Container>
        <Row className="justify-content-center my-4 mx-0">
          <Col align="center">
            <div className="table-horizontal-line"></div>
          </Col>
        </Row>
        <Row className="justify-content-center mx-0">
          <Col lg={8} md={10} sm={12} align="center">
            <InvestorList
              investors={investors}
              investorChangedListener={investorChangedListener}
            ></InvestorList>
          </Col>
        </Row>
      </Container>
    </>
  );
};
