using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using Temalab_tozsde.DAOs;
using Temalab_tozsde.Models;

namespace Temalab_tozsde
{
    public class Program
    {
        public static void Main(string[] args)
        {        
            List<Stock> stocks = new StockDAO().GetStocks();
            List<Crypto> cryptos = new CryptoDAO().GetCryptos();
            PriceUpdater priceUpdater = new PriceUpdater();
            priceUpdater.Start(stocks, cryptos);
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
