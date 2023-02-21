using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System;
using Temalab_tozsde.Models;
using Temalab_tozsde.DAOs;

namespace Temalab_tozsde.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CryptosController: ControllerBase
    {
        private readonly ILogger<CryptosController> _logger;
        public CryptosController(ILogger<CryptosController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<Crypto> GetCryptos(int investorID)
        {      
            return new CryptoDAO().GetCryptos();

        }

        [HttpPost]
        [Route("buy")]
        public double BuyStock(CryptoTransactionData data)
        {
            double balanceChange = 0;
            try
            {
                var crypto = new CryptoDAO().GetCryptoBySymbol(data.Symbol);
                var newCryptoTrans = new CryptoTransaction
                {
                    InvestorId = data.InvestorId,
                    CryptoId = crypto.CryptoId,
                    Date = DateTime.Now.ToString("yyyy-MM-dd"),
                    Quantity = data.Quantity,
                    UnitPrice = data.UnitPrice
                };

                balanceChange = -data.Quantity * data.UnitPrice;
                new InvestorDAO().UpdateBalance(data.InvestorId, balanceChange);

                new CryptoTransactionDAO().InsertCryptoTransaction(newCryptoTrans);
            }
            catch (Exception e) { System.Diagnostics.Debug.WriteLine("Insert CryptoTransaction Exception: " + e.ToString()); }

            return balanceChange;
        }

        public class CryptoTransactionData
        {
            public int InvestorId { get; set; }
            public string Symbol { get; set; }
            public double UnitPrice { get; set; }
            public int Quantity { get; set; }
        }
    }
}
