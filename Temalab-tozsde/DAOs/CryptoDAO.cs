using System.Collections.Generic;
using System.Linq;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.DAOs
{
    public class CryptoDAO
    {
        public void UpdatePrice(int cryptoID, double newPrice)
        {
            using(DatabaseContext context = new DatabaseContext())
            {
                var crypto = context.Crypto.Single(q=> q.CryptoId==cryptoID);
                crypto.Price = newPrice;
                context.SaveChanges();
            }
        }
        public List<Crypto> GetCryptos()
        {
            List<Crypto> cryptos = new List<Crypto>();
            using (DatabaseContext context = new DatabaseContext())
            {
                cryptos = context.Crypto.ToList();
            }
            return cryptos;
        }
        public double GetUnitPrice(int cryptoID)
        {
            double unitPrice = 0;
            using(DatabaseContext context = new DatabaseContext())
            {
                var crypto = context.Crypto.Single(q => q.CryptoId == cryptoID);
                unitPrice = crypto.Price;
            }
            return unitPrice;
        }
        public Crypto GetCryptoBySymbol(string symbol)   
        {
            Crypto crypto;
            using (DatabaseContext context = new DatabaseContext())
            {
                crypto = context.Crypto.Where(q => q.Symbol.ToUpper() == symbol.ToUpper()).FirstOrDefault();
            }
            return crypto;
        }
    }
}
