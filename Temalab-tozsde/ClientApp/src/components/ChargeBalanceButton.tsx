import * as React from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import ChargeBalanceModal from "./ChargeBalanceModal";

export default function ChargeBalanceButton() {
  const [showChargeBalance, setShowChargeBalance] = useState(false);
  return (
    <Container>
      <ChargeBalanceModal
        show={showChargeBalance}
        close={() => setShowChargeBalance(false)}
      />
      <Button onClick={() => setShowChargeBalance(true)}>Charge balance</Button>
    </Container>
  );
}
