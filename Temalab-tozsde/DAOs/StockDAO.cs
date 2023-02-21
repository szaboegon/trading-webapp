using System.Collections.Generic;
using System.Linq;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.DAOs
{
    public class StockDAO
    {
        public void UpdatePrice(int stockID, double newPrice)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                var stock = context.Stock.Single(q => q.StockId==stockID);
                stock.Price = newPrice;
                context.SaveChanges();
            }
        }
        public List<Stock> GetStocks()
        {
            List<Stock> stocks = new List<Stock>();
            using(DatabaseContext context = new DatabaseContext())
            {
                stocks = context.Stock.ToList();
            }
            return stocks;
        }
        public double GetUnitPrice(int stockID)
        {
            double unitPrice=0;
            using(DatabaseContext context = new DatabaseContext())
            {
                var stock = context.Stock.Single(q => q.StockId == stockID);
                unitPrice = stock.Price;
            }
            return unitPrice;
        }
        public Stock GetStockBySymbol(string symbol)
        {
            Stock stock;
            using (DatabaseContext context = new DatabaseContext())
            {
                stock = context.Stock.Where(q => q.Symbol.ToUpper()==symbol.ToUpper()).FirstOrDefault();     
            }
            return stock;
        }
    }
}
