import * as React from "react";
import { useContext } from "react";
import "../App.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, Container, Button, Stack } from "react-bootstrap";
import logo from "../images/trading.png";
import { UserContext } from "../UserContext";

const CustomNavbar: React.FunctionComponent = () => {
  const userContext = useContext(UserContext);
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container className="px-0">
          <Navbar.Brand as={NavLink} to="/" end className="d-none d-md-block">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="Company logo"
            />
            TRADIX
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            {userContext?.investor?.userName !== "admin" ? (
              <Stack direction="horizontal">
                <Nav.Link as={NavLink} to="/stocks">
                  Stocks
                </Nav.Link>
                <Nav.Link as={NavLink} to="/crypto">
                  Crypto
                </Nav.Link>
                <Nav.Link as={NavLink} to="/portfolio">
                  Portfolio
                </Nav.Link>
              </Stack>
            ) : (
              <Nav.Link as={NavLink} to="/manageusers">
                Manage Users
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/help">
              Help
            </Nav.Link>
          </Nav>
          {userContext?.investor == null ? (
            <Stack direction="horizontal" gap={2}>
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="light">Register</Button>
              </Link>
            </Stack>
          ) : (
            <Button
              variant="light"
              onClick={() => {
                userContext.setInvestor(null);
                routeChange();
              }}
            >
              Logout
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
