using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using Temalab_tozsde.DAOs;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortfolioController : ControllerBase
    {
        private readonly ILogger<PortfolioController> _logger;
        public PortfolioController(ILogger<PortfolioController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("updatebalance")]
        public void UpdateBalance(BalanceUpdateForm balanceUpdateForm)
        {
            new InvestorDAO().UpdateBalance(balanceUpdateForm.InvestorId, balanceUpdateForm.BalanceAddition);
        }

        [HttpGet]
        [Route("stocktransactions/{investorId}")]
        public List<PortfolioTransactionData> GetStockTransactions(int investorId) 
        {
            return new StockTransactionDAO().GetPortfolioTransactionData(investorId).ToList();
        }

        [HttpGet]
        [Route("cryptotransactions/{investorId}")]
        public List<PortfolioTransactionData> GetCryptoTransactions(int investorId)
        {
            return new CryptoTransactionDAO().GetPortfolioTransactionData(investorId).ToList();
        }

        [HttpPost]
        [Route("sellstock")]
        public double SellStockTransaction(PortfolioTransactionData data)
        {
            InvestorDAO investorDAO = new InvestorDAO();
            StockTransactionDAO stockTransactionDAO = new StockTransactionDAO();
            StockTransaction transaction = stockTransactionDAO.GetStockTransactionById(data.TransactionId);
            Investor investor = investorDAO.GetInvestorById(transaction.InvestorId);
            var balanceChange = data.CurrentPrice * data.Quantity;
            investorDAO.UpdateBalance(transaction.InvestorId, balanceChange);
            stockTransactionDAO.RemoveStockTransaction(transaction);

            return balanceChange;
        }

        [HttpPost]
        [Route("sellcrypto")]
        public double SellCryptoTransaction(PortfolioTransactionData data)
        {
            InvestorDAO investorDAO = new InvestorDAO();
            CryptoTransactionDAO cryptoTransactionDAO = new CryptoTransactionDAO();
            CryptoTransaction transaction = cryptoTransactionDAO.GetCryptoTransactionById(data.TransactionId);
            Investor investor = investorDAO.GetInvestorById(transaction.InvestorId);
            var balanceChange = data.CurrentPrice * data.Quantity;
            investorDAO.UpdateBalance(transaction.InvestorId, balanceChange);
            cryptoTransactionDAO.RemoveCryptoTransaction(transaction);

            return balanceChange;
        }
    }

    public class BalanceUpdateForm
    {
        public int InvestorId { get; set; }
        public double BalanceAddition { get; set; }
    }

    public class PortfolioTransactionData
    { 
        public int TransactionId { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public int Quantity { get; set; }   
        public double OldPrice { get; set; }
        public double CurrentPrice { get; set; }
    }
}
