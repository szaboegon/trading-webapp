using System.Collections.Generic;
using System.Linq;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.DAOs
{
    public class InvestorDAO
    {
        public List<Investor> GetInvestors()
        {
            List<Investor> investors = new List<Investor>();
            using(DatabaseContext context = new DatabaseContext())
            {
                investors = context.Investor.ToList();
            }
            return investors;
        }
        public Investor GetInvestor(string userName, string password)
        {
            Investor investor = new Investor();
            using(DatabaseContext context = new DatabaseContext())
            {
                investor = context.Investor.SingleOrDefault(q => q.UserName == userName && q.Password == password);
            }
            return investor;
        }
        public Investor GetInvestorById(int investorId)
        {
            Investor investor = new Investor();
            using (DatabaseContext context = new DatabaseContext())
            {
                investor = context.Investor.SingleOrDefault(q => q.InvestorId==investorId);
            }
            return investor;
        }
        public void InsertInvestor(Investor investor)
        {
            using(DatabaseContext context = new DatabaseContext())
            {
                context.Investor.Add(investor);
                context.SaveChanges();
            }
        }
        public void RemoveInvestor(Investor investor)
        {
            using(DatabaseContext context = new DatabaseContext())
            {
                context.Investor.Remove(investor);
                context.SaveChanges();
            }
        }
        public void UpdateBalance(int investorID, double balanceAddition)
        {
            using(DatabaseContext context = new DatabaseContext())
            {
                var investor = context.Investor.Single(q=> q.InvestorId==investorID);
                investor.Balance+=balanceAddition;
                context.SaveChanges();
            }
        }
    }
}
