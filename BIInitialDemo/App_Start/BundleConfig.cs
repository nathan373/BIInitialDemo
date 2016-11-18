using System.Web;
using System.Web.Optimization;

namespace BIInitialDemo
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/Library/angular-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/Library/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/Library/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/Library/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/Library/bootstrap.js",
                      "~/Scripts/Library/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/dundles/virtulization").Include(
                     "~/Scripts/Library/d3.js",
                     "~/Scripts/Library/c3.js",
                     "~/Scripts/Library/dc.js"));

            /* Need to optimize before production use -- By Nathan Ma*/
            /* Use CDN as an option to increase bundle loading speed */
            //bundles.UseCdn = true;

            //var jqueryCdnPath = "https://code.jquery.com/jquery-3.1.1.min.js";

            //bundles.Add(new ScriptBundle("~/bundles/jquery",
            //    jqueryCdnPath).Include(
            //    "~/Scripts/jquery-{version}.js"));

            //Overide the Web.config settings to enable bundle and minification.
            //BundleTable.EnableOptimizations = true;
        }
    }
}
