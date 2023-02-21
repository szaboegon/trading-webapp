using System.Collections.Generic;

namespace Temalab_tozsde.Models
{
    public partial class Investor
    {
        public Investor()
        {
            CryptoTransaction = new HashSet<CryptoTransaction>();
            FavCrypto = new HashSet<FavCrypto>();
            FavStock = new HashSet<FavStock>();
            StockTransaction = new HashSet<StockTransaction>();
        }

        public int InvestorId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string TaxNumber { get; set; }
        public string Email { get; set; }
        public double Balance { get; set; }

        public virtual ICollection<CryptoTransaction> CryptoTransaction { get; set; }
        public virtual ICollection<FavCrypto> FavCrypto { get; set; }
        public virtual ICollection<FavStock> FavStock { get; set; }
        public virtual ICollection<StockTransaction> StockTransaction { get; set; }
    }
}
