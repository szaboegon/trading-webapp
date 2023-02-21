namespace Temalab_tozsde.Models
{
    public partial class FavStock
    {
        public int FavStockId { get; set; }
        public int InvestorId { get; set; }
        public int StockId { get; set; }

        public virtual Investor Investor { get; set; }
        public virtual Stock Stock { get; set; }
    }
}
