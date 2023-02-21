import * as React from "react";
import { useContext, useState } from "react";
import { Investor } from "../models/investor.model";
import { UserContext } from "../UserContext";
import RemoveInvestorModal from "./RemoveInvestorModal";

interface IInvestorListRowProps{
    investor: Investor;
    investorChangedListener: () => void;
}

const InvestorListRow: React.FunctionComponent<IInvestorListRowProps> = ({
    investor,
    investorChangedListener,
}) => {
    const [showRemoveInvestor, setShowRemoveInvestor] = useState(false);
    const userContext = useContext(UserContext);

    return (
        <>
          <tr>
            {userContext?.investor ? (
              <RemoveInvestorModal
                show={showRemoveInvestor}
                close={() => setShowRemoveInvestor(false)}
                investor={investor}
                investorChangedListener={investorChangedListener}
              />
            ) : (
              <></>
            )}
            <td onClick={() => setShowRemoveInvestor(true)}>{investor.userName}</td>
            <td onClick={() => setShowRemoveInvestor(true)}>{investor.fullName}</td>
            <td onClick={() => setShowRemoveInvestor(true)}>{investor.email}</td>
            <td onClick={() => setShowRemoveInvestor(true)}>{investor.address}</td>
            <td onClick={() => setShowRemoveInvestor(true)}>{investor.taxNumber}</td>
            <td onClick={() => setShowRemoveInvestor(true)}>{investor.balance} $</td>
          </tr>
        </>
      );
};

export default InvestorListRow;