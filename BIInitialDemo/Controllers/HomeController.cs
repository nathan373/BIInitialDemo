using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIInitialDemo.Controllers
{
    public class HomeController : Controller
    {

        //BIDBEntities objapi = new BIDBEntities();

        public ActionResult Index()
        {
            //return Json(objapi.USP_HotelMaster_Select("1").AsEnumerable(), JsonRequestBehavior.AllowGet);

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Dashboard()
        {
            ViewBag.Message = "Your Dashboard page.";

            return View();
        }
    }
}