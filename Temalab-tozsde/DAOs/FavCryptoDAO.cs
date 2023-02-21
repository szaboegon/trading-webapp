using System.Collections.Generic;
using System.Linq;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.DAOs
{
    public class FavCryptoDAO
    {
        public List<Crypto> GetFavCryptos(int investorID)
        {
            List<Crypto> favCryptos = new List<Crypto>();
            using(DatabaseContext context = new DatabaseContext())
            {
                var favCryptoIDs = context.FavCrypto.Where(q=> q.InvestorId == investorID).Select(q=>q.CryptoId).ToList();
                favCryptos = context.Crypto.Where(q=>favCryptoIDs.Contains(q.CryptoId)).ToList();
            }
            return favCryptos;
        }
        public void InsertFavCryptoEntry(FavCrypto favCryptoEntry)
        {
            using(DatabaseContext context = new DatabaseContext())
            {
                context.FavCrypto.Add(favCryptoEntry);
                context.SaveChanges();
            }
        }
        public void RemoveFavCryptoEntry(FavCrypto favCryptoEntry)
        {
            using(DatabaseContext context = new DatabaseContext())
            {
                context.FavCrypto.Remove(favCryptoEntry);
                context.SaveChanges();
            }
        }
        public void RemoveFavCryptoEntries(int investorId)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                context.FavCrypto.RemoveRange(context.FavCrypto.Where(q => q.InvestorId == investorId));
                context.SaveChanges();
            }
        }
        public FavCrypto GetFavCryptoEntry(int investorId, int cryptoId)
        {
            FavCrypto favCrypto;
            using (DatabaseContext context = new DatabaseContext())
            {
                favCrypto = context.FavCrypto.Where(c => c.InvestorId == investorId && c.CryptoId == cryptoId).SingleOrDefault();
            }
            return favCrypto;
        }
    }
}
