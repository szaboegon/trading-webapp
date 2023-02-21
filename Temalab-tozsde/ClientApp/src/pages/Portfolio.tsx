import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import PortfolioItemList from "../components/PortfolioItemList";
import ChargeBalanceButton from "../components/ChargeBalanceButton";
import { UserContext } from "../UserContext";
import { PieChart } from "react-minimal-pie-chart";
import { PortfolioTransaction } from "../models/portfolioTransaction.model";

interface PieChartData {
  title: string;
  value: number;
  color: string;
}
export const Portfolio = () => {
  const userContext = useContext(UserContext);
  const [viewCrypto, setViewCrypto] = useState(false);
  const [stocksChanged, setStocksChanged] = useState(false);
  const [cryptosChanged, setCryptosChanged] = useState(false);
  const [stockPieChartLoaded, setStockPieChartLoaded] = useState(false);
  const [cryptoPieChartLoaded, setCryptoPieChartLoaded] = useState(false);

  const [stockPieChartData, setStockPieChartData] = useState<PieChartData[]>(
    []
  );
  const [cryptoPieChartData, setCryptoPieChartData] = useState<PieChartData[]>(
    []
  );

  const stocksChangedListener = () => {
    setStocksChanged((stocksChanged) => !stocksChanged);
  };

  const cryptosChangedListener = () => {
    setCryptosChanged((cryptosChanged) => !cryptosChanged);
  };

  const handleViewChange = () => {
    setViewCrypto(!viewCrypto);
  };

  const loadCryptoPieChartData = () => {
    var cryptoData = new Map<string, PieChartData>();
    cryptoTransactions.map((crypto) => {
      var r = "#00";
      var g = "96";
      var b = "00".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      });
      var randomColor = r + g + b;
      if (
        cryptoData.get(crypto.symbol)?.value !== undefined &&
        cryptoData.has(crypto.symbol)
      ) {
        var sum = cryptoData.get(crypto.symbol)!!.value + crypto.quantity;
        var data: PieChartData = {
          title: crypto.symbol,
          value: sum,
          color: randomColor,
        };
        cryptoData.set(crypto.symbol, data);
      } else {
        var data: PieChartData = {
          title: crypto.symbol,
          value: crypto.quantity,
          color: randomColor,
        };
        cryptoData.set(crypto.symbol, data);
      }
    });

    setCryptoPieChartData(Array.from(cryptoData.values()));
  };

  const loadStockPieChartData = () => {
    var stockData = new Map<string, PieChartData>();
    stockTransactions.map((stock) => {
      var r = "#00";
      var g = "96";
      var b = "00".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      });
      var randomColor = r + g + b;
      if (
        stockData.get(stock.symbol)?.value !== undefined &&
        stockData.has(stock.symbol)
      ) {
        var sum = stockData.get(stock.symbol)!!.value + stock.quantity;
        var data: PieChartData = {
          title: stock.symbol,
          value: sum,
          color: randomColor,
        };
        stockData.set(stock.symbol, data);
      } else {
        var data: PieChartData = {
          title: stock.symbol,
          value: stock.quantity,
          color: randomColor,
        };
        stockData.set(stock.symbol, data);
      }
    });

    setStockPieChartData(Array.from(stockData.values()));
  };

  useEffect(() => {
    loadCryptoPieChartData();
  }, [cryptoPieChartLoaded, cryptosChanged]);

  useEffect(() => {
    loadStockPieChartData();
  }, [stockPieChartLoaded, stocksChanged]);

  useEffect(() => {
    getStockTransactions();
    const id = setInterval(getStockTransactions, 65000);
    return () => clearInterval(id);
  }, [stocksChanged]);

  useEffect(() => {
    getCryptoTransactions();
    const id = setInterval(getCryptoTransactions, 65000);
    return () => clearInterval(id);
  }, [cryptosChanged]);

  const getStockTransactions = () => {
    if (userContext?.investor == null) {
      return;
    }

    fetch(
      "api/portfolio/stocktransactions/" + userContext?.investor?.investorId
    )
      .then((response) => response.json())
      .then((data) => {
        setStockTransactions(data);
        setStockPieChartLoaded(!stockPieChartLoaded);
      });
  };

  const getCryptoTransactions = () => {
    if (userContext?.investor == null) {
      return;
    }

    fetch(
      "api/portfolio/cryptotransactions/" + userContext?.investor?.investorId
    )
      .then((response) => response.json())
      .then((data) => {
        setCryptoTransactions(data);
        setCryptoPieChartLoaded(!cryptoPieChartLoaded);
      });
  };

  const [stockTransactions, setStockTransactions] = useState<
    PortfolioTransaction[]
  >([]);

  const [cryptoTransactions, setCryptoTransactions] = useState<
    PortfolioTransaction[]
  >([]);

  return (
    <>
      <Container className="px-0" fluid>
        <Container fluid className="portfolio-header">
          <Row className="justify-content-center">
            <Col className="mt-5" align="start" lg={8} md={10} sm={12}>
              <h1 className="text-dark">Personal data</h1>
              <Row>
                <Col className="mt-3">
                  Name: {userContext?.investor?.fullName}
                </Col>
                <Col className="mt-3">
                  Username: {userContext?.investor?.userName}
                </Col>
                <Col className="mt-3">
                  Balance: ${userContext?.investor?.balance}
                </Col>
              </Row>
              <Row>
                <Col className="mt-3">
                  Tax number: {userContext?.investor?.taxNumber}
                </Col>
                <Col className="mt-3">
                  Address: {userContext?.investor?.address}
                </Col>
                <Col className="mt-3" align="right">
                  <ChargeBalanceButton></ChargeBalanceButton>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        {viewCrypto ? (
          <Row className="justify-content-center mt-5 mx-0">
            <Row className="justify-content-center">
              <Col lg={5} md={10} sm={12} align="center">
                <h2 className="text-dark">Crypto</h2>
                <div className="horizontal-line mb-4"></div>
                <Button onClick={handleViewChange}>Show Stocks</Button>
              </Col>
            </Row>
            <Row className="justify-content-center"></Row>
            <Col className="mt-5" xl={6} lg={8} md={10} sm={12} align="center">
              <PortfolioItemList
                viewCrypto={viewCrypto}
                items={cryptoTransactions}
                stocksChangedListener={stocksChangedListener}
                cryptosChangedListener={cryptosChangedListener}
              ></PortfolioItemList>
            </Col>
            <Col xl={4} lg={8} md={10} sm={12} align="center">
              <PieChart
                data={cryptoPieChartData}
                radius={30}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={(index) => ({
                  fontSize: "3px",
                  fontFamily: "sans-serif",
                })}
                labelPosition={50}
              ></PieChart>
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center mt-5 mx-0">
            <Row className="justify-content-center">
              <Col lg={5} md={10} sm={12} align="center">
                <h2 className="text-dark">Stocks</h2>
                <div className="horizontal-line mb-4"></div>
                <Button onClick={handleViewChange}>Show Cryptos</Button>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col
                className="mt-5"
                xl={6}
                lg={8}
                md={10}
                sm={12}
                align="center"
              >
                <PortfolioItemList
                  viewCrypto={viewCrypto}
                  items={stockTransactions}
                  stocksChangedListener={stocksChangedListener}
                  cryptosChangedListener={cryptosChangedListener}
                ></PortfolioItemList>
              </Col>
              <Col
                className="align-content-center"
                xl={4}
                lg={8}
                md={10}
                sm={12}
              >
                <PieChart
                  data={stockPieChartData}
                  radius={30}
                  label={({ dataEntry }) => dataEntry.title}
                  labelStyle={(index) => ({
                    fontSize: "3px",
                    fontFamily: "sans-serif",
                  })}
                  labelPosition={50}
                ></PieChart>
              </Col>
            </Row>
          </Row>
        )}
      </Container>
    </>
  );
};
