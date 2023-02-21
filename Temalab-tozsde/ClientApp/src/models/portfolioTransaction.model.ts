export interface PortfolioTransaction{
    transactionId: number;
    symbol: string;
    name: string;
    date: string;
    quantity: number;
    oldPrice: number;
    currentPrice: number;
}