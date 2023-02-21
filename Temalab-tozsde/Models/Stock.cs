using System.Collections.Generic;

namespace Temalab_tozsde.Models
{
    public partial class Stock
    {
        public Stock()
        {
            FavStock = new HashSet<FavStock>();
            StockTransaction = new HashSet<StockTransaction>();
        }

        public int StockId { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string ReleaseDate { get; set; }

        public virtual ICollection<FavStock> FavStock { get; set; }
        public virtual ICollection<StockTransaction> StockTransaction { get; set; }
    }
}
