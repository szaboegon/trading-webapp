import * as React from "react";
import { Table } from "react-bootstrap";
import PortfolioItemListRow from "./PortfolioItemListRow";
import { PortfolioTransaction } from "../models/portfolioTransaction.model";

interface IPortfolioItemListProps {
  items: PortfolioTransaction[];
  viewCrypto: boolean;
  stocksChangedListener: () => void;
  cryptosChangedListener: () => void;
}

const PortfolioItemList: React.FunctionComponent<IPortfolioItemListProps> = ({
  items,
  viewCrypto,
  stocksChangedListener,
  cryptosChangedListener,
}) => {
  return (
    <>
      <Table striped bordered hover className="stocks">
        <thead className="table-header-row">
          <tr>
            <th style={{ width: "6%" }}>Symbol</th>
            <th style={{ width: "30%" }}>Name</th>
            <th style={{ width: "15%" }}>Acquired for</th>
            <th style={{ width: "15%" }}>Current Price</th>
            <th style={{ width: "10%" }}>Owned</th>
            <th style={{ width: "25%" }}>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <PortfolioItemListRow
              item={item}
              key={item.transactionId}
              viewCrypto={viewCrypto}
              stocksChangedListener={stocksChangedListener}
              cryptosChangedListener={cryptosChangedListener}
            ></PortfolioItemListRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default PortfolioItemList;
