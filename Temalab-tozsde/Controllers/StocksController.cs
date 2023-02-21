using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using Temalab_tozsde.DAOs;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StocksController : ControllerBase
    {
        private readonly ILogger<StocksController> _logger;
        public StocksController(ILogger<StocksController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<Stock> GetStocks()
        {
           return new StockDAO().GetStocks();

        }

        [HttpPost]
        [Route("buy")]
        public double BuyStock(StockTransactionData data)
        {
            double balanceChange = 0;
            try
            {
                var stock = new StockDAO().GetStockBySymbol(data.Symbol);
                var newStockTrans = new StockTransaction
                {
                    InvestorId = data.InvestorId,
                    StockId = stock.StockId,
                    Date = DateTime.Now.ToString("yyyy-MM-dd"),
                    Quantity = data.Quantity,
                    UnitPrice = data.UnitPrice
                };

                balanceChange = -data.Quantity * data.UnitPrice;
                new InvestorDAO().UpdateBalance(data.InvestorId, balanceChange);

                new StockTransactionDAO().InsertStockTransaction(newStockTrans);
            }
            catch (Exception e) { System.Diagnostics.Debug.WriteLine("Insert StockTransaction Exception: " + e.ToString()); }

            return balanceChange;
        }

        public class StockTransactionData
        {
            public int InvestorId { get; set; }
            public string Symbol { get; set; }
            public double UnitPrice { get; set; }
            public int Quantity { get; set; }
        }
    }
}
