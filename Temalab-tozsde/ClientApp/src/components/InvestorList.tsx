import * as React from "react";
import { useContext } from "react";
import { Table } from "react-bootstrap";
import { Investor } from "../models/investor.model";
import { UserContext } from "../UserContext";
import InvestorListRow from "./InvestorListRow";

interface IInvestorListProps{
    investors: Investor[];
    investorChangedListener: () => void;
}

const InvestorList: React.FunctionComponent<IInvestorListProps> = ({
    investors,
    investorChangedListener,
}) =>{
    const userContext = useContext(UserContext);

    return (
        <>
          <Table striped bordered hover className="stocks">
            <thead className="table-header-row">
              <tr>
                <th style={{ width: "12%" }}>Username</th>
                <th style={{ width: "15%" }}>Full Name</th>
                <th style={{ width: "22%" }}>Email</th>
                <th style={{ width: "22%" }}>Address</th>
                <th style={{ width: "10%" }}>Tax Number</th>
                <th style={{ width: "19%" }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((investor) => (
                <InvestorListRow
                  investor={investor}
                  investorChangedListener={investorChangedListener}
                  key={investor.investorId}
                ></InvestorListRow>
              ))}
            </tbody>
          </Table>
        </>
      );
};

export default InvestorList;