namespace Temalab_tozsde.Models
{
    public partial class StockTransaction
    {
        public int StockTransactionId { get; set; }
        public int InvestorId { get; set; }
        public int StockId { get; set; }
        public string Date { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }

        public virtual Investor Investor { get; set; }
        public virtual Stock Stock { get; set; }
    }
}
