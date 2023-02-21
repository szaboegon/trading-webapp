using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;
using Temalab_tozsde.API;
using Temalab_tozsde.DAOs;
using Temalab_tozsde.Models;

namespace Temalab_tozsde
{
    public class PriceUpdater
    {
        public bool isComplete { get; set; }
        public async void Start(List<Stock> stocks, List<Crypto> cryptos)
        {
            isComplete = false;
            await UpdatePrices(stocks,cryptos);
            isComplete = true;
        }
        Task UpdatePrices(List<Stock> stocks, List<Crypto> cryptos)
        {
            return Task.Factory.StartNew(() =>
            {
                int counter = 0;
                ApiPrice apiPrice;
                TwelveDataApiHandler twelveDataApiHandler = new TwelveDataApiHandler();
                while (true)
                {
                    foreach (Stock stock in stocks)
                    {
                        if (counter % 8 == 0 && counter != 0)
                        {
                            Thread.Sleep(65000);
                        }
                        apiPrice = twelveDataApiHandler.GetApiPrice(stock.Symbol);
                        if (apiPrice.Code == 429)
                        {
                            Thread.Sleep(65000);
                            apiPrice = twelveDataApiHandler.GetApiPrice(stock.Symbol);
                        }
                        double newPrice = Convert.ToDouble(apiPrice.Price, CultureInfo.InvariantCulture);
                        new StockDAO().UpdatePrice(stock.StockId, newPrice);
                        counter++;
                    }
                    foreach (Crypto crypto in cryptos)
                    {
                        if (counter % 8 == 0 && counter != 0)
                        {
                            Thread.Sleep(65000);
                        }
                        apiPrice = twelveDataApiHandler.GetApiPrice(crypto.Symbol);
                        if (apiPrice.Code == 429)
                        {
                            Thread.Sleep(65000);
                            apiPrice = twelveDataApiHandler.GetApiPrice(crypto.Symbol);
                        }
                        double newPrice = Convert.ToDouble(apiPrice.Price, CultureInfo.InvariantCulture);
                        new CryptoDAO().UpdatePrice(crypto.CryptoId, newPrice);
                        counter++;
                    }
                }
            });
        }
    }
}