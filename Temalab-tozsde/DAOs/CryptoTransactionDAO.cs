using System.Collections.Generic;
using System.Linq;
using Temalab_tozsde.Controllers;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.DAOs
{
    public class CryptoTransactionDAO
    {
        public List<CryptoTransaction> GetCryptoTransactions(int investorID)
        {
            List<CryptoTransaction> cryptoTransactions = new List<CryptoTransaction>();
            using(DatabaseContext context = new DatabaseContext())
            {
                cryptoTransactions = context.CryptoTransaction.Where(q => q.InvestorId==investorID).ToList();
            }
            return cryptoTransactions;
        }
        public void InsertCryptoTransaction(CryptoTransaction cryptoTransaction)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                context.CryptoTransaction.Add(cryptoTransaction);
                context.SaveChanges();
            }
        }
        public void RemoveCryptoTransaction(CryptoTransaction cryptoTransaction)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                context.CryptoTransaction.Remove(cryptoTransaction);
                context.SaveChanges();
            }
        }
        public void RemoveCryptoTransactions(int investorId)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                context.CryptoTransaction.RemoveRange(context.CryptoTransaction.Where(q => q.InvestorId == investorId));
                context.SaveChanges();
            }
        }
        public CryptoTransaction GetCryptoTransactionById(int transactionId)
        {
            CryptoTransaction transaction = new CryptoTransaction();
            using (DatabaseContext context = new DatabaseContext())
            {
                transaction = context.CryptoTransaction.Where(t => t.CryptoTransactionId == transactionId).SingleOrDefault(); ;
            }
            return transaction;
        }
        public List<PortfolioTransactionData> GetPortfolioTransactionData(int investorId)
        {
            List<PortfolioTransactionData> res;
            using (DatabaseContext context = new DatabaseContext())
            {
                var query = from ctr in context.CryptoTransaction
                            where ctr.InvestorId.Equals(investorId)
                            select new PortfolioTransactionData
                            {
                                TransactionId=ctr.CryptoTransactionId,
                                Symbol = ctr.Crypto.Symbol,
                                Name = ctr.Crypto.Name,
                                Date = ctr.Date,
                                Quantity = ctr.Quantity,
                                OldPrice = ctr.UnitPrice,
                                CurrentPrice = ctr.Crypto.Price
                            };
                res = query.ToList();
            }
            return res;
        }
    }
}
