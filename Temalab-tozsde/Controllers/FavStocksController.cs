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
    public class FavStocksController : ControllerBase
    {
        private readonly ILogger<FavStocksController> _logger;
        public FavStocksController(ILogger<FavStocksController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("{investorId}")]
        public List<Stock> GetFavStocks(int investorId)
        { 
            return new FavStockDAO().GetFavStocks(investorId);
        }

        [HttpPost]
        public void ManageFavStock(FavStockData data)
        {
            var stock = new StockDAO().GetStockBySymbol(data.Symbol);

            if (data.IsFavourite)
            {
                try
                {
                    FavStockDAO favStockDAO = new FavStockDAO();
                    var deleteFavStock = favStockDAO.GetFavStockEntry(data.InvestorId, stock.StockId);
                    favStockDAO.RemoveFavStockEntry(deleteFavStock);

                }catch(Exception e) { System.Diagnostics.Debug.WriteLine("Delete Exception: " + e.ToString()); }
                
            }
            else
            {
                try
                {
                    FavStock newFavStock = new FavStock()
                    {
                        StockId = stock.StockId,
                        InvestorId = data.InvestorId
                    };

                    new FavStockDAO().InsertFavStockEntry(newFavStock);
                }catch(Exception e) { System.Diagnostics.Debug.WriteLine("Insert Exception: "+e.ToString()); }
            }
        }

        public class FavStockData
        {
            public int InvestorId { get; set; }
            public string Symbol { get; set; }
            public bool IsFavourite { get; set; }
        }
    }
}
