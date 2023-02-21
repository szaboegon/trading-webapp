import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import StockList from "../components/StockList";
import { Stock } from "../models/stock.model";
import { UserContext } from "../UserContext";

export const Stocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [favStocks, setFavStocks] = useState<Stock[]>([]);
  const [showFavs, setShowFavs] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [favChanged, setFavChanged] = useState(false);
  const userContext = useContext(UserContext);

  const handleChange = () => {
    setShowFavs(!showFavs);
    setShowBalance(!showBalance);
  };

  const favChangedListener = () => {
    setFavChanged((favChanged) => !favChanged);
  };

  useEffect(() => {
    if (userContext?.investor == null) {
      return;
    }

    fetch("api/favstocks/" + userContext?.investor?.investorId)
      .then((response) => response.json())
      .then((data) => {
        setFavStocks(data);
        if (showFavs) {
          setStocks(data);
        }
      });
  }, [showFavs, favChanged]);

  useEffect(() => {
    getStocks();
    const id = setInterval(getStocks, 65000);
    return () => clearInterval(id);
  }, [showFavs]);

  const getStocks = () => {
    if (userContext?.investor != null && showFavs) {
      fetch("api/favstocks/" + userContext?.investor?.investorId)
        .then((response) => response.json())
        .then((data) => {
          setStocks(data);
        });
    } else {
      fetch("api/stocks")
        .then((response) => response.json())
        .then((data) => {
          setStocks(data);
        });
    }
  };

  return (
    <>
      <Container className="px-0" fluid>
        <Container fluid className="page-header">
          <Row className="justify-content-center">
            <Col className="mt-5" align="start" lg={8} md={10} sm={12}>
              <h1 className="text-dark">Stocks</h1>
              <h3 className="sub-header">
                Buy or sell stocks anytime with Tradix
              </h3>
            </Col>
          </Row>
        </Container>
        <Row className="justify-content-center my-4 mx-0">
          <Col align="center">
            <div className="table-horizontal-line"></div>
          </Col>
        </Row>
        {userContext?.investor ? (
          <Row className="mx-0 justify-content-center mb-1">
            <Col align="start" lg={4} md={6} sm={12}>
              <Form.Check
                className="show-favourites"
                label="Show Favourites"
                onChange={handleChange}
                type="checkbox"
                id="show-favourites-checkbox"
              />
            </Col>
            <Col
              className=""
              align="end"
              lg={4}
              md={6}
              sm={12}
              onChange={handleChange}
            >
              <h5 className="text-dark">
                Balance: ${userContext?.investor?.balance}
              </h5>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <Row className="justify-content-center mx-0">
          <Col lg={8} md={10} sm={12} align="center">
            <StockList
              stocks={stocks}
              favStocks={favStocks}
              favChangedListener={favChangedListener}
            ></StockList>
          </Col>
        </Row>
      </Container>
    </>
  );
};
