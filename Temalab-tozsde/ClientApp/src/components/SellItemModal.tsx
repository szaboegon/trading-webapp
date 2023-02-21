import * as React from "react";
import { useState, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { PortfolioTransaction } from "../models/portfolioTransaction.model";
import { UserContext } from "../UserContext";

interface ISellItemModalProps {
  show: boolean;
  close: any;
  item: PortfolioTransaction;
  viewCrypto: boolean;
  stocksChangedListener: () => void;
  cryptosChangedListener: () => void;
}

const SellItemModal: React.FunctionComponent<ISellItemModalProps> = ({
  show,
  close,
  item,
  viewCrypto,
  stocksChangedListener,
  cryptosChangedListener,
}) => {
  const [amount, setAmount] = useState(0);
  const userContext = useContext(UserContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.currentTarget.value));
  };

  const sellStock = () => {
    if (userContext?.investor == null) {
      return;
    }

    fetch("api/portfolio/sellstock", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    }).then((response) => {
      if (response.status === 200) {
        const jsonPromise = response.json();
        jsonPromise.then((data) => {
          if (userContext && userContext.investor) {
            let investor = Object.assign({}, userContext?.investor);
            investor.balance += data;
            userContext?.setInvestor(investor);
          }
        });
        stocksChangedListener();
        console.log("Stock sell transaction successful");
      } else {
        console.log("Error");
      }
    });
  };

  const sellCrypto = () => {
    if (userContext?.investor == null) {
      return;
    }

    fetch("api/portfolio/sellcrypto", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    }).then((response) => {
      if (response.status === 200) {
        const jsonPromise = response.json();
        jsonPromise.then((data) => {
          if (userContext && userContext.investor) {
            let investor = Object.assign({}, userContext?.investor);
            investor.balance += data;
            userContext?.setInvestor(investor);
          }
        });
        cryptosChangedListener();
        console.log("Crypto sell transaction successful");
      } else {
        console.log("Error");
      }
    });
  };

  return (
    <>
      <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton className="stock-modal-header">
          <Modal.Title>Sell {item.symbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="stock-modal-body">
          <Row>
            <Col>
              <Form.Label className="stock-modal-name mb-3">
                {item.name}
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Bought for: ${item.oldPrice}</Form.Label>
            </Col>
            <Col>
              <Form.Label>Current Price: ${item.currentPrice}</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Purchase Date: {item.date}</Form.Label>
            </Col>
            <Col>
              <Form.Label>Owned: {item.quantity}</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className="stock-modal-profit">
                Profit:{" "}
                {Math.round(
                  (item.currentPrice * item.quantity -
                    item.oldPrice * item.quantity) *
                    100
                ) / 100}
              </Form.Label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <p className="stock-modal-total">
            Total: {Math.round(item.currentPrice * item.quantity * 100) / 100}
          </p>
          <Button
            variant="primary"
            onClick={() => {
              close(true);
              if (viewCrypto) {
                sellCrypto();
              } else {
                sellStock();
              }
            }}
          >
            Sell
          </Button>
          <Button variant="danger" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SellItemModal;
