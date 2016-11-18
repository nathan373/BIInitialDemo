using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BIInitialDemo.Startup))]
namespace BIInitialDemo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
