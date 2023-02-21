using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Temalab_tozsde.DAOs;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationController: ControllerBase
    {
        private readonly ILogger<RegistrationController> _logger;
        public RegistrationController(ILogger<RegistrationController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public Investor Registration(RegistrationForm registrationForm)
        {
            Investor investor = new Investor();
            InvestorDAO investorDAO = new InvestorDAO();
            var investors = investorDAO.GetInvestors();
            foreach(Investor inv in investors)
            {
                if(inv.UserName==registrationForm.UserName || inv.TaxNumber==registrationForm.TaxNumber || inv.Email == registrationForm.Email)
                {
                    return null;
                }
            }
            investor.UserName = registrationForm.UserName;
            investor.Password = registrationForm.Password;
            investor.FullName = registrationForm.FullName;
            investor.Address = registrationForm.Address;
            investor.TaxNumber = registrationForm.TaxNumber;
            investor.Email = registrationForm.Email;
            investor.Balance = 0;

            investorDAO.InsertInvestor(investor);

            return investor;
        }
    }

    public class RegistrationForm
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string TaxNumber { get; set; }
        public string Email { get; set; }
    }
}
