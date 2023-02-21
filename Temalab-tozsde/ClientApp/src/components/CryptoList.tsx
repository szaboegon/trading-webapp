import * as React from "react";
import { useContext } from "react";
import { Table } from "react-bootstrap";
import { Crypto } from "../models/crypto.model";
import { UserContext } from "../UserContext";
import CryptoListRow from "./CryptoListRow";

interface ICryptoListProps {
  cryptos: Crypto[];
  favCryptos: Crypto[];
  favChangedListener: () => void;
}

const CryptoList: React.FunctionComponent<ICryptoListProps> = ({
  cryptos,
  favCryptos,
  favChangedListener
}) => {
  const userContext = useContext(UserContext);
  return (
    <>
      <Table striped bordered hover className="cryptos">
        <thead className="table-header-row">
          <tr>
            <th style={{ width: "6%" }}>Symbol</th>
            <th style={{ width: "37%" }}>Name</th>
            <th style={{ width: "15%" }}>Price</th>
            <th style={{ width: "35%" }}>Release date</th>
            {userContext?.investor ? (
              <th style={{ width: "2%" }}>
                <i className="bi bi-star-fill"></i>
              </th>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <CryptoListRow crypto={crypto} favCryptos={favCryptos} favChangedListener={favChangedListener} key={crypto.symbol}></CryptoListRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CryptoList;
