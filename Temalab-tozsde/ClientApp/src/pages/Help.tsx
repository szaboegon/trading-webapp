import * as React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import crypto from '../images/crypto.png'
import stock from '../images/stock.png'

export const Help = () => {
  return (
    <>
      <Container className="px-0" fluid>
        <Container fluid className="page-header">
          <Row className="justify-content-center">
            <Col className="mt-5" align="start" lg={8} md={10} sm={12}>
              <h1 className='text-dark'>Help</h1>
              <h3 className='sub-header'>All you have to know about cryptocurrencies and stocks</h3>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid>
        <Row className="justify-content-center mt-5">
          <Col align="center" lg={5} md={12} sm={12}>
            <h2 className='text-dark mb-2'>What are stocks?</h2>
            <div className='help-horizontal-line'></div>
            <div className="about-text mx-3 mt-3">
              A stock, also known as equity, is a security that represents the ownership of a
              fraction of the issuing corporation. Units of stock are called "shares" which entitles
              the owner to a proportion of the corporation's assets and profits equal to how much stock they own.
              Stocks are bought and sold predominantly on stock exchanges and are the foundation of many individual investors' portfolios.
              Stock trades have to conform to government regulations meant to protect investors from fraudulent practices.
              Learn more about stocks
              <span> </span>
              <a href='https://www.investopedia.com/terms/s/stock.asp'>here</a>
              <span>.</span>
              <Col align="center">
                <Image className='crypto-img' src={stock} />
              </Col>
            </div>
          </Col>
          <Col align="center" lg={5} md={12} sm={12}>
            <h3 className='text-dark mb-2'>What is cryptocurrency?</h3>
            <div className='help-horizontal-line'></div>
            <div className="about-text mx-3 mt-3">
              A cryptocurrency, crypto-currency,
              or crypto is a digital currency designed to work as a medium of exchange through a computer network
              that is not reliant on any central authority, such as a government or bank, to uphold or maintain it.
              It is a decentralized system for verifying that the parties to a transaction have the money they claim to have,
              eliminating the need for traditional intermediaries, such as banks, when funds are being transferred between
              two entities.
              Learn more about cryptocurrencies
              <span> </span>
                <a href='https://www.forbes.com/advisor/investing/cryptocurrency/what-is-cryptocurrency/'>here</a>
              <span>.</span>
              <Col align="center">
                <Image className='crypto-img' src={crypto} />
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

