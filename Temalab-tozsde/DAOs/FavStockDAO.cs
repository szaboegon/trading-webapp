using System.Collections.Generic;
using System.Linq;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.DAOs
{
    public class FavStockDAO
    {
        public List<Stock> GetFavStocks(int investorID)
        {
            List<Stock> favStocks = new List<Stock>();
            using(DatabaseContext context = new DatabaseContext())
            {
                var favStockIDs = context.FavStock.Where(q=> q.InvestorId == investorID).Select(q => q.StockId).ToList();
                favStocks= context.Stock.Where(q=>favStockIDs.Contains(q.StockId)).ToList();
            }
            return favStocks;
        }
        public void InsertFavStockEntry(FavStock favStockEntry)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                context.FavStock.Add(favStockEntry);
                context.SaveChanges();
            }
        }
        public void RemoveFavStockEntry(FavStock favStockEntry)
        {
            using(DatabaseContext context = new DatabaseContext())
            {
                context.FavStock.Remove(favStockEntry);
                context.SaveChanges();
            }
        }
        public void RemoveFavStockEntries(int investorId)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                context.FavStock.RemoveRange(context.FavStock.Where(q => q.InvestorId == investorId));
                context.SaveChanges();
            }
        }
        public FavStock GetFavStockEntry(int investorId, int stockId)
        {
            FavStock favStock;
            using (DatabaseContext context = new DatabaseContext())
            {
                favStock = context.FavStock.Where(s => s.InvestorId == investorId && s.StockId == stockId).SingleOrDefault();
            }
            return favStock;
        }
    }
}
