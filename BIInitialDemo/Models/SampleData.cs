using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BIInitialDemo.Models
{
    public class SampleData
    {
        public string school_state { get; set; }
        public string resource_type { get; set; }
        public string poverty_level { get; set; }
        public string grade_level { get; set; }
        public string total_donations { get; set; }
        public string funding_status { get; set; }
        public string date_posted { get; set; }
     

        public static SampleData FromCsv(string csvLine)
        {
            string[] values = csvLine.Split(',');
            SampleData dailyValues = new SampleData();

            dailyValues.school_state = values[8];
            
            dailyValues.resource_type = values[26];
            dailyValues.poverty_level = values[27];
            dailyValues.grade_level = values[28];
            dailyValues.total_donations = values[36];
            dailyValues.funding_status = values[40];
            dailyValues.date_posted = values[41];

            return dailyValues;
        }
    }
}