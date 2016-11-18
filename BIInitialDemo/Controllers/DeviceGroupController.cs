using BIInitialDemo.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Web.Http;
using System.Linq;

namespace BIInitialDemo.Controllers
{
    public class DeviceGroupController : ApiController
    {

        // To select Hotel Details
        [HttpGet]
        public IEnumerable<DeviceGroupModels> getDevicesSummary()
        {
            string url = "https://2vf2f8xp27.execute-api.us-east-1.amazonaws.com/test/function_one";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);

            try
            {
                var response = (HttpWebResponse)request.GetResponse();
                if ((response.StatusCode == HttpStatusCode.OK) && (response.ContentLength > 0))
                {
                    var reader = new StreamReader(response.GetResponseStream());
                    string s = reader.ReadToEnd();
                    return JsonConvert.DeserializeObject<IEnumerable<DeviceGroupModels>>(s);
                }
            }
            catch
            {
                throw;
            }

            return null;
        }


        // To select Hotel Details
        [HttpGet]
        public List<SampleData> getCSVData()
        {
            try
            {
                return File.ReadAllLines("D:\\Demo\\NodeJs\\sampledata\\sampledata.csv").Skip(1).Select(v => SampleData.FromCsv(v)).ToList<SampleData>();
               
            }
            catch
            {
                throw;
            }
            return null;
        }
    }
}
