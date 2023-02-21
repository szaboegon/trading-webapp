namespace Temalab_tozsde.Models
{
    public partial class FavCrypto
    {
        public int FavCryptoId { get; set; }
        public int InvestorId { get; set; }
        public int CryptoId { get; set; }

        public virtual Crypto Crypto { get; set; }
        public virtual Investor Investor { get; set; }
    }
}
