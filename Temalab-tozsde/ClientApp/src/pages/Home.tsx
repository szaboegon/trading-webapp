import * as React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import home2 from "../images/home2.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export const Home = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      <Container fluid className="home-header">
        <Row className="justify-content-center">
          <Col className="my-auto" align="start" lg={4} md={6} sm={12}>
            <h1 className="text-dark">Trading with Tradix</h1>
            <h3 className="sub-header">
              Trade stocks and crypto anywhere and anytime
            </h3>
            {userContext?.investor ? (
              <></>
            ) : (
              <NavLink to="/register">
                <Button
                  className="register-now-btn"
                  variant="primary"
                  size="lg"
                >
                  Register now
                </Button>
              </NavLink>
            )}
          </Col>
          <Col className="col2" lg={4} md={6}>
            <Image className="home-img" src={home2} />
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row className="justify-content-center mt-5">
          <Col align="center" lg={3} md={4} sm={12}>
            <h3 className="text-dark mb-2">Trade stocks</h3>
            <div className="horizontal-line"></div>
            <div className="about-text mx-3 mt-3">
              Tradix trading platform allows you to trade stocks in a wide
              range. With the help of our advanced trading tools, you can
              monitor the amount of stocks you bought. You can also track the
              actual price of the stocks and the profit you can make with
              selling them. There is also a possibility to watch the
              distribution of your bought stocks.
            </div>
          </Col>
          <Col align="center" lg={3} md={4} sm={12}>
            <h3 className="text-dark mb-2">Trade crypto</h3>
            <div className="horizontal-line"></div>
            <div className="about-text mx-3 mt-3">
              Tradix trading platform allows you to trade cryptos in a wide
              range. With the help of our advanced trading tools, you can
              monitor the amount of crpyto you have. You can also track the
              actual price of the cryptos and the profit you can make with
              selling them. There is also a possibility to watch the
              distribution of your bought cryptos.
            </div>
          </Col>
          <Col align="center" lg={3} md={4} sm={12}>
            <h3 className="text-dark mb-2">Why us?</h3>
            <div className="horizontal-line"></div>
            <div className="about-text mx-3 mt-3">
              Tradix is one of the world's leading stock and cryptocurrency
              trading website. At our company your personal data is in safe
              hands and most importantly your money protected in many different
              ways. You can choose from wide range of secured payment methods.
              Register now, join millions of users and start trading today.
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
