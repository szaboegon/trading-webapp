using System.Net;
using System.Text.Json;

namespace Temalab_tozsde.API
{
    public class TwelveDataApiHandler
    {
        static string apiKey = "42ed851461a74aaf86cdcd181f08cc7a";
        public ApiPrice GetApiPrice(string symbol)
        {
            using (WebClient wc = new WebClient())
            {
                var response = wc.DownloadString($"https://api.twelvedata.com/price?symbol={symbol}&country=United%20States&apikey={apiKey}");
                var apiPrice = JsonSerializer.Deserialize<ApiPrice>(response, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
                return apiPrice;
            }
        }
    }
    public class ApiPrice
    {
        public string Price { get; set; }
        public int Code { get; set; }
    }
}