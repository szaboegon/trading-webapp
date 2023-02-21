import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Crypto } from "../models/crypto.model";
import { UserContext } from "../UserContext";
import BuyCryptoModal from "./BuyCryptoModal";

interface ICryptoListRowProps {
  crypto: Crypto;
  favCryptos: Crypto[];
  favChangedListener: () => void;
}

interface FavCryptoData {
  investorId: number | undefined;
  symbol: string;
  isFavourite: boolean;
}

const CryptoListRow: React.FunctionComponent<ICryptoListRowProps> = ({
  crypto,
  favCryptos,
  favChangedListener,
}) => {
  const [showBuyCrypto, setShowBuyCrypto] = useState(false);
  const userContext = useContext(UserContext);
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    const contains = (c: Crypto) => c.symbol === crypto.symbol;
    if (userContext?.investor != null) {
      setFavourite(favCryptos.some(contains));
    }
  }, [favCryptos]);

  async function handleChange() {
    await manageFavourite();
    setFavourite(!favourite);
    favChangedListener();
  }

  async function manageFavourite() {
    var data: FavCryptoData = {
      investorId: userContext?.investor?.investorId,
      symbol: crypto.symbol,
      isFavourite: favourite,
    };

    if (data.investorId === undefined) {
      return;
    }

    await fetch("api/favcryptos", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Favecrypto added/removed");
      } else {
        console.log("Error");
      }
    });
  }

  return (
    <>
      <tr>
        {userContext?.investor ? (
          <BuyCryptoModal
            show={showBuyCrypto}
            close={() => setShowBuyCrypto(false)}
            crypto={crypto}
          />
        ) : (
          <></>
        )}
        <td onClick={() => setShowBuyCrypto(true)}>{crypto.symbol}</td>
        <td onClick={() => setShowBuyCrypto(true)}>{crypto.name}</td>
        <td onClick={() => setShowBuyCrypto(true)}>${crypto.price}</td>
        <td onClick={() => setShowBuyCrypto(true)}>{crypto.releaseDate}</td>
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

export default CryptoListRow;
