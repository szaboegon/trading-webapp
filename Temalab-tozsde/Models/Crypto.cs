using System.Collections.Generic;

namespace Temalab_tozsde.Models
{
    public partial class Crypto
    {
        public Crypto()
        {
            CryptoTransaction = new HashSet<CryptoTransaction>();
            FavCrypto = new HashSet<FavCrypto>();
        }

        public int CryptoId { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string ReleaseDate { get; set; }

        public virtual ICollection<CryptoTransaction> CryptoTransaction { get; set; }
        public virtual ICollection<FavCrypto> FavCrypto { get; set; }
    }
}
