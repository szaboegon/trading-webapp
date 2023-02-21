using System.Collections.Generic;
using System.Linq;
using Temalab_tozsde.Controllers;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.DAOs
{
    public class StockTransactionDAO
    {
        public List<StockTransaction> GetStockTransactions(int investorID)
        {
            List<StockTransaction> stockTransactions = new List<StockTransaction>();
            using (DatabaseContext context = new DatabaseContext())
            {
                stockTransactions = context.StockTransaction.Where(q => q.InvestorId == investorID).ToList();
            }
            return stockTransactions;
        }
        public void InsertStockTransaction(StockTransaction stockTransaction)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                context.StockTransaction.Add(stockTransaction);
                context.SaveChanges();
            }
        }
        public void RemoveStockTransaction(StockTransaction stockTransaction)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                context.StockTransaction.Remove(stockTransaction);
                context.SaveChanges();
            }
        }
        public void RemoveStockTransactions(int investorId)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                context.StockTransaction.RemoveRange(context.StockTransaction.Where(q => q.InvestorId == investorId));
                context.SaveChanges();
            }
        }
        public StockTransaction GetStockTransactionById(int transactionId)
        {
            StockTransaction transaction = new StockTransaction();
            using (DatabaseContext context = new DatabaseContext())
            {
               transaction = context.StockTransaction.Where(t => t.StockTransactionId == transactionId).SingleOrDefault();;
            }
            return transaction;
        }
        public List<PortfolioTransactionData> GetPortfolioTransactionData(int investorId)
        {
            List<PortfolioTransactionData> res;
            using (DatabaseContext context = new DatabaseContext())
            {
                var query = from str in context.StockTransaction
                            where str.InvestorId.Equals(investorId)
                            select new PortfolioTransactionData
                            {
                                TransactionId=str.StockTransactionId,
                                Symbol = str.Stock.Symbol,
                                Name = str.Stock.Name,
                                Date = str.Date,
                                Quantity = str.Quantity,
                                OldPrice = str.UnitPrice,
                                CurrentPrice = str.Stock.Price
                            };
                res = query.ToList();
            }
            return res;
        }
    }
}
