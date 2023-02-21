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
    public class FavCryptosController : ControllerBase
    {
        private readonly ILogger<FavCryptosController> _logger;
        public FavCryptosController(ILogger<FavCryptosController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("{investorId}")]
        public List<Crypto> GetFavCryptos(int investorId)
        {
            return new FavCryptoDAO().GetFavCryptos(investorId);
        }

        [HttpPost]
        public void ManageFavCrypto(FavCryptoData data)
        {
            var crypto = new CryptoDAO().GetCryptoBySymbol(data.Symbol);

            if (data.IsFavourite)
            {
                try
                {
                    FavCryptoDAO favCryptoDAO = new FavCryptoDAO();
                    var deleteFavCrypto = favCryptoDAO.GetFavCryptoEntry(data.InvestorId, crypto.CryptoId);
                    favCryptoDAO.RemoveFavCryptoEntry(deleteFavCrypto);

                }
                catch (Exception e) { Console.WriteLine("Delete Exception: " + e.ToString()); }

            }
            else
            {
                try
                {

                    FavCrypto newFavCrypto = new FavCrypto()
                    {
                        CryptoId = crypto.CryptoId,
                        InvestorId = data.InvestorId
                    };

                    new FavCryptoDAO().InsertFavCryptoEntry(newFavCrypto);
                }
                catch (Exception e) { Console.WriteLine("Insert Exception: " + e.ToString()); }
            }
        }

        public class FavCryptoData
        {
            public int InvestorId { get; set; }
            public string Symbol { get; set; }
            public bool IsFavourite { get; set; }
        }
    }
}
