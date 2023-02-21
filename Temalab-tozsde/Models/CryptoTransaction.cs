namespace Temalab_tozsde.Models
{
    public partial class CryptoTransaction
    {
        public int CryptoTransactionId { get; set; }
        public int InvestorId { get; set; }
        public int CryptoId { get; set; }
        public string Date { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }

        public virtual Crypto Crypto { get; set; }
        public virtual Investor Investor { get; set; }
    }
}
