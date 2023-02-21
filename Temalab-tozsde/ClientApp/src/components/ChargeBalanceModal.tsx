import * as React from "react";
import { useState, useContext } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { UserContext } from "../UserContext";
import { BalanceUpdateForm } from "../models/balanceUpdateForm.model";

interface IChargeBalanceModalProps {
  show: boolean;
  close: any;
}

const ChargeBalanceModal: React.FunctionComponent<IChargeBalanceModalProps> = ({
  show,
  close,
}) => {
  const [money, setMoney] = useState(0);
  const userContext = useContext(UserContext);

  const updateBalance = () => {
    let balanceUpdateForm: BalanceUpdateForm = {
      investorId: userContext?.investor?.investorId,
      balanceAddition: money,
    };
    fetch("api/portfolio/updatebalance", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(balanceUpdateForm),
    }).then((response) => {
      if (response.status === 200) {
        let investor = Object.assign({}, userContext?.investor);
        investor.balance += money;
        userContext?.setInvestor(investor);
      } else {
        console.log("no data passed back");
      }
    });
  };

  return (
    <>
      <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton className="portfolio-modal-header">
          <Modal.Title>Charge balance</Modal.Title>
        </Modal.Header>
        <Modal.Body className="portfolio-modal-body">
          <Form.Label>Amount:</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => setMoney(parseInt(e.target.value))}
              autoFocus
            />
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              updateBalance();
              close(true);
            }}
          >
            Charge
          </Button>
          <Button variant="danger" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChargeBalanceModal;
