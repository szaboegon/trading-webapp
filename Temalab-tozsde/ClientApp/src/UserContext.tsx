import { createContext } from "react";
import { Investor } from "./models/investor.model";

export interface IProviderValue {
    investor: Investor | null;
    setInvestor: React.Dispatch<React.SetStateAction<Investor | null>>;
}

export const UserContext = createContext<IProviderValue | null>(null);