import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Stock } from "../models/stock.model";
import { UserContext } from "../UserContext";

interface IBuyStockModalProps {
  show: boolean;
  close: any;
  stock: Stock;
}

interface StockTransactionData {
  investorId: number;
  symbol: string;
  unitPrice: number;
  quantity: number;
}

const BuyStockModal: React.FunctionComponent<IBuyStockModalProps> = ({
  show,
  close,
  stock,
}) => {
  const [amount, setAmount] = useState(0);
  const userContext = useContext(UserContext);

  useEffect(() => {
    setAmount(1);
  }, [show]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.currentTarget.value));
  };

  const buyStock = () => {
    let balance = userContext?.investor?.balance;
    if (
      userContext?.investor?.investorId &&
      balance &&
      balance >= amount * stock.price
    ) {
      var data: StockTransactionData = {
        investorId: userContext?.investor?.investorId,
        symbol: stock.symbol,
        quantity: amount,
        unitPrice: stock.price,
      };

      fetch("api/stocks/buy", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
          console.log("Stock buy transaction successful");
        } else {
          console.log("Error");
        }
      });
    } else {
      renderAlert();
    }
  };

  const renderAlert = () => {};
  return (
    <>
      <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton className="stock-modal-header">
          <Modal.Title>Buy {stock.symbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="stock-modal-body">
          <Row>
            <Col>
              <Form.Label className="stock-modal-name mb-3">
                {stock.name}
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Unit Price: ${stock.price}</Form.Label>
            </Col>
            <Col>
              <Form.Label>Release Date: {stock.releaseDate}</Form.Label>
            </Col>
          </Row>
          <Form.Label for="stock-amount-input">Amount:</Form.Label>
          <Form.Control
            id="stock-amount-input"
            className="mb-3"
            autoFocus
            type="number"
            min={1}
            defaultValue={1}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <p className="stock-modal-total">
            Total:{" "}
            {Math.round((stock.price + Number.EPSILON) * amount * 100000) /
              100000}
          </p>
          <Button
            variant="primary"
            onClick={() => {
              buyStock();
              close(true);
            }}
          >
            Buy
          </Button>
          <Button variant="danger" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BuyStockModal;
