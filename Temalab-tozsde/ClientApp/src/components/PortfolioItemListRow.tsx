import * as React from "react";
import { useState } from "react";
import SellItemModal from "./SellItemModal";
import { PortfolioTransaction } from "../models/portfolioTransaction.model";

interface IPortfolioItemListRowProps {
  item: PortfolioTransaction;
  viewCrypto: boolean;
  stocksChangedListener: () => void;
  cryptosChangedListener: () => void;
}

const PortfolioItemListRow: React.FunctionComponent<
  IPortfolioItemListRowProps
> = ({ item, viewCrypto, stocksChangedListener, cryptosChangedListener }) => {
  const [showSellItem, setShowSellItem] = useState(false);
  return (
    <>
      <tr>
        <SellItemModal
          show={showSellItem}
          close={() => setShowSellItem(false)}
          item={item}
          viewCrypto={viewCrypto}
          stocksChangedListener={stocksChangedListener}
          cryptosChangedListener={cryptosChangedListener}
        />
        <td onClick={() => setShowSellItem(true)}>{item.symbol}</td>
        <td onClick={() => setShowSellItem(true)}>{item.name}</td>
        <td onClick={() => setShowSellItem(true)}>${item.oldPrice}</td>
        <td onClick={() => setShowSellItem(true)}>${item.currentPrice}</td>
        <td onClick={() => setShowSellItem(true)}>{item.quantity}</td>
        <td onClick={() => setShowSellItem(true)}>{item.date}</td>
      </tr>
    </>
  );
};

export default PortfolioItemListRow;
