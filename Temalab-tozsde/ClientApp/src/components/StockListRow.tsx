import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Stock } from "../models/stock.model";
import { UserContext } from "../UserContext";
import BuyStockModal from "./BuyStockModal";

interface IStockListRowProps {
  stock: Stock;
  favStocks: Stock[];
  favChangedListener: () => void;
}

interface FavStockData {
  investorId: number | undefined;
  symbol: string;
  isFavourite: boolean;
}

const StockListRow: React.FunctionComponent<IStockListRowProps> = ({
  stock,
  favStocks,
  favChangedListener,
}) => {
  const [showBuyStock, setShowBuyStock] = useState(false);
  const userContext = useContext(UserContext);
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    const contains = (s: Stock) => s.symbol === stock.symbol;
    if (userContext?.investor != null) {
      setFavourite(favStocks.some(contains));
    }
  }, [favStocks]);

  async function handleChange() {
    await manageFavourite();
    setFavourite(!favourite);
    favChangedListener();
  }

  async function manageFavourite() {
    var data: FavStockData = {
      investorId: userContext?.investor?.investorId,
      symbol: stock.symbol,
      isFavourite: favourite,
    };

    if (data.investorId === undefined) {
      return;
    }

    await fetch("api/favstocks", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Favestock added/removed");
      } else {
        console.log("Error");
      }
    });
  }

  return (
    <>
      <tr>
        {userContext?.investor ? (
          <BuyStockModal
            show={showBuyStock}
            close={() => setShowBuyStock(false)}
            stock={stock}
          />
        ) : (
          <></>
        )}
        <td onClick={() => setShowBuyStock(true)}>{stock.symbol}</td>
        <td onClick={() => setShowBuyStock(true)}>{stock.name}</td>
        <td onClick={() => setShowBuyStock(true)}>${stock.price}</td>
        <td onClick={() => setShowBuyStock(true)}>{stock.releaseDate}</td>
        {userContext?.investor ? (
          <td>
            <Form className="favourite">
              <Form.Check
                type="checkbox"
                id="favourite-checkbox"
                onChange={handleChange}
                checked={favourite}
              />
            </Form>
          </td>
        ) : (
          <></>
        )}
      </tr>
    </>
  );
};

export default StockListRow;
