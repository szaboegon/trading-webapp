import * as React from "react";
import { useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Investor } from "../models/investor.model";
import { UserContext } from "../UserContext";

interface IRemoveInvestorModalProps{
    show: boolean;
    close: any;
    investor: Investor;
    investorChangedListener: () => void;
}

const RemoveInvestorModal: React.FunctionComponent<IRemoveInvestorModalProps> = ({
    show,
    close,
    investor,
    investorChangedListener,
}) => {
    const userContext = useContext(UserContext);

    async function removeInvestor() {
        await fetch("api/investors", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(investor),
          }).then((response) => {
            if (response.status === 200) {
              console.log("Investor removed successfully");
            } else {
              console.log("Error");
            }
          });
    };

    return (
        <>
          <Modal id="asd" show={show} onHide={close} centered>
            <Modal.Header closeButton className="stock-modal-header">
              <Modal.Title>Remove {investor.userName}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="stock-modal-body">
              <Row>
                <Col>
                  <Form.Label className="stock-modal-name mb-3">
                    Full Name: {investor.fullName}
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Email: {investor.email}</Form.Label>
                </Col>
                <Col>
                  <Form.Label>TaxNumber: {investor.taxNumber}</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Balance: {investor.balance} $</Form.Label>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={async() => {
                  //TODO on click
                  await removeInvestor();
                  investorChangedListener();
                  close(true);
                }}
              >
                Remove
              </Button>
              <Button variant="danger" onClick={close}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
};

export default RemoveInvestorModal;