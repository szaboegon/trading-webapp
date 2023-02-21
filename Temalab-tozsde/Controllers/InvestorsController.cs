using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Temalab_tozsde.DAOs;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvestorsController : ControllerBase
    {
        private readonly ILogger<InvestorsController> _logger;
        public InvestorsController(ILogger<InvestorsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<Investor> GetInvestors()
        {
            return new InvestorDAO().GetInvestors();
        }

        [HttpPost]
        public void RemoveInvestor(Investor investor)
        {
            new FavStockDAO().RemoveFavStockEntries(investor.InvestorId);
            new FavCryptoDAO().RemoveFavCryptoEntries(investor.InvestorId);
            new StockTransactionDAO().RemoveStockTransactions(investor.InvestorId);
            new CryptoTransactionDAO().RemoveCryptoTransactions(investor.InvestorId);
            new InvestorDAO().RemoveInvestor(investor);
        }
    }
}
