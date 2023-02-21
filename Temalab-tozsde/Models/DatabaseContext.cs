using Microsoft.EntityFrameworkCore;
using System.IO;

namespace Temalab_tozsde.Models
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Crypto> Crypto { get; set; }
        public virtual DbSet<CryptoTransaction> CryptoTransaction { get; set; }
        public virtual DbSet<FavCrypto> FavCrypto { get; set; }
        public virtual DbSet<FavStock> FavStock { get; set; }
        public virtual DbSet<Investor> Investor { get; set; }
        public virtual DbSet<Stock> Stock { get; set; }
        public virtual DbSet<StockTransaction> StockTransaction { get; set; }
        string connString = $"Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename={Directory.GetCurrentDirectory()}\\Database\\database.mdf;Integrated Security=True;Connect Timeout=30";

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(connString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Crypto>(entity =>
            {
                entity.Property(e => e.CryptoId).HasColumnName("cryptoID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(255);

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.ReleaseDate)
                    .IsRequired()
                    .HasColumnName("releaseDate")
                    .HasMaxLength(50);

                entity.Property(e => e.Symbol)
                    .IsRequired()
                    .HasColumnName("symbol")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<CryptoTransaction>(entity =>
            {
                entity.Property(e => e.CryptoTransactionId).HasColumnName("cryptoTransactionID");

                entity.Property(e => e.CryptoId).HasColumnName("cryptoID");

                entity.Property(e => e.Date)
                    .IsRequired()
                    .HasColumnName("date")
                    .HasMaxLength(50);

                entity.Property(e => e.InvestorId).HasColumnName("investorID");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.UnitPrice).HasColumnName("unitPrice");

                entity.HasOne(d => d.Crypto)
                    .WithMany(p => p.CryptoTransaction)
                    .HasForeignKey(d => d.CryptoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CryptoTransaction_Crypto");

                entity.HasOne(d => d.Investor)
                    .WithMany(p => p.CryptoTransaction)
                    .HasForeignKey(d => d.InvestorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CryptoTransaction_Investor");
            });

            modelBuilder.Entity<FavCrypto>(entity =>
            {
                entity.Property(e => e.FavCryptoId).HasColumnName("favCryptoID");

                entity.Property(e => e.CryptoId).HasColumnName("cryptoID");

                entity.Property(e => e.InvestorId).HasColumnName("investorID");

                entity.HasOne(d => d.Crypto)
                    .WithMany(p => p.FavCrypto)
                    .HasForeignKey(d => d.CryptoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FavCrypto_Crypto");

                entity.HasOne(d => d.Investor)
                    .WithMany(p => p.FavCrypto)
                    .HasForeignKey(d => d.InvestorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FavCrypto_Investor");
            });

            modelBuilder.Entity<FavStock>(entity =>
            {
                entity.Property(e => e.FavStockId).HasColumnName("favStockID");

                entity.Property(e => e.InvestorId).HasColumnName("investorID");

                entity.Property(e => e.StockId).HasColumnName("stockID");

                entity.HasOne(d => d.Investor)
                    .WithMany(p => p.FavStock)
                    .HasForeignKey(d => d.InvestorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FavStock_Investor");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.FavStock)
                    .HasForeignKey(d => d.StockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FavStock_Stock");
            });

            modelBuilder.Entity<Investor>(entity =>
            {
                entity.Property(e => e.InvestorId).HasColumnName("investorID");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(255);

                entity.Property(e => e.Balance).HasColumnName("balance");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasColumnName("fullName")
                    .HasMaxLength(255);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(255);

                entity.Property(e => e.TaxNumber)
                    .IsRequired()
                    .HasColumnName("taxNumber")
                    .HasMaxLength(255);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasColumnName("userName")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Stock>(entity =>
            {
                entity.Property(e => e.StockId).HasColumnName("stockID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(255);

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.ReleaseDate)
                    .IsRequired()
                    .HasColumnName("releaseDate")
                    .HasMaxLength(50);

                entity.Property(e => e.Symbol)
                    .IsRequired()
                    .HasColumnName("symbol")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<StockTransaction>(entity =>
            {
                entity.Property(e => e.StockTransactionId).HasColumnName("stockTransactionID");

                entity.Property(e => e.Date)
                    .IsRequired()
                    .HasColumnName("date")
                    .HasMaxLength(50);

                entity.Property(e => e.InvestorId).HasColumnName("investorID");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.StockId).HasColumnName("stockID");

                entity.Property(e => e.UnitPrice).HasColumnName("unitPrice");

                entity.HasOne(d => d.Investor)
                    .WithMany(p => p.StockTransaction)
                    .HasForeignKey(d => d.InvestorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StockTransaction_Investor");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.StockTransaction)
                    .HasForeignKey(d => d.StockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StockTransaction_Stock");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
