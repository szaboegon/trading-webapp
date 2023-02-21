import * as React from "react";
import { useContext } from "react";
import { Table } from "react-bootstrap";
import { Stock } from "../models/stock.model";
import { UserContext } from "../UserContext";
import StockListRow from "./StockListRow";

interface IStockListProps {
  stocks: Stock[];
  favStocks: Stock[];
  favChangedListener: () => void;
}

const StockList: React.FunctionComponent<IStockListProps> = ({
  stocks,
  favStocks,
  favChangedListener,
}) => {
  const userContext = useContext(UserContext);
  return (
    <>
      <Table striped bordered hover className="stocks">
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
          {stocks.map((stock) => (
            <StockListRow
              stock={stock}
              favStocks={favStocks}
              favChangedListener={favChangedListener}
              key={stock.symbol}
            ></StockListRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default StockList;
