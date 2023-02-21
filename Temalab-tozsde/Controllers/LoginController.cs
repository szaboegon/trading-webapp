using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Temalab_tozsde.DAOs;
using Temalab_tozsde.Models;

namespace Temalab_tozsde.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController: ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public Investor Login(LoginCredentials loginCredentials)
        {
            if (loginCredentials.UserName == "admin" && loginCredentials.Password == "admin")
            {
                Investor investor = new Investor();
                investor.UserName = loginCredentials.UserName;
                investor.Password = loginCredentials.Password;
                return investor;
            }
            return new InvestorDAO().GetInvestor(loginCredentials.UserName,loginCredentials.Password);
        }
    }

    public class LoginCredentials
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
