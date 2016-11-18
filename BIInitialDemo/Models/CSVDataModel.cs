using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BIInitialDemo.Models
{
    public class CSVDataModel
    {
        public string _id { get; set; }
        public string _projectid { get; set; }
        public string _teacher_acctid { get; set; }
        public string _schoolid { get; set; }
        public string school_ncesid { get; set; }
        public string school_latitude { get; set; }
        public string school_longtitude { get; set; }
        public string school_city { get; set; }
        public string school_state { get; set; }
        public string school_zip { get; set; }
        public string school_metro { get; set; }
        public string school_district { get; set; }
        public string school_county { get; set; }
        public string school_charter { get; set; }
        public string school_magnet { get; set; }
        public string school_year_round { get; set; }
        public string school_nlns { get; set; }
        public string school_kipp { get; set; }
        public string school_charter_ready_promise { get; set; }
        public string teacher_prefix { get; set; }
        public string teacher_teach_for_america { get; set; }
        public string teacher_ny_teaching_fellow { get; set; }
        public string primary_focus_subject { get; set; }
        public string primary_focus_area { get; set; }
        public string secondary_focus_subject { get; set; }
        public string secondary_focus_area { get; set; }
        public string resource_type { get; set; }
        public string poverty_level { get; set; }
        public string grade_level { get; set; }
        public string vendor_shipping_charges { get; set; }
        public string sales_tax { get; set; }
        public string payment_processing_charges { get; set; }
        public string fulfillment_labor_materials { get; set; }
        public string total_price_excluding_optional_support { get; set; }
        public string total_price_including_optional_support { get; set; }
        public string students_reached { get; set; }
        public string total_donations { get; set; }
        public string num_donors { get; set; }
        public string eligible_double_your_impact_match { get; set; }
        public string eligible_almost_home_match { get; set; }
        public string funding_status { get; set; }
        public string date_posted { get; set; }
        public string date_completed { get; set; }
        public string date_thank_you_packet_mailed { get; set; }
        public string date_expiration { get; set; }


        public static CSVDataModel FromCsv(string csvLine)
        {
            string[] values = csvLine.Split(',');
            CSVDataModel dailyValues = new CSVDataModel();

           
            dailyValues._id = values[0] ;
            dailyValues._projectid = values[1];
            dailyValues._teacher_acctid = values[2];
            dailyValues._schoolid = values[3];
            dailyValues.school_ncesid = values[4];
            dailyValues.school_latitude = values[5];
            dailyValues.school_longtitude = values[6];
            dailyValues.school_city = values[7];
            dailyValues.school_state = values[8];
            dailyValues.school_zip = values[9];
            dailyValues.school_metro = values[10];
            dailyValues.school_district = values[11];
            dailyValues.school_county = values[12];
            dailyValues.school_charter = values[13];
            dailyValues.school_magnet = values[14];
            dailyValues.school_year_round = values[15];
            dailyValues.school_nlns = values[16];
            dailyValues.school_kipp = values[17];

            dailyValues.school_charter_ready_promise = values[18];
            dailyValues.teacher_prefix = values[19];
            dailyValues.teacher_teach_for_america = values[20];
            dailyValues.teacher_ny_teaching_fellow = values[21];
            dailyValues.primary_focus_subject = values[22];
            dailyValues.primary_focus_area = values[23];
            dailyValues.secondary_focus_subject = values[24];
            dailyValues.secondary_focus_area = values[25];
            dailyValues.resource_type = values[26];
            dailyValues.poverty_level = values[27];
            dailyValues.grade_level = values[28];
            dailyValues.vendor_shipping_charges = values[29];
            dailyValues.sales_tax = values[30];
            dailyValues.payment_processing_charges = values[31];
            dailyValues.fulfillment_labor_materials = values[32];
            dailyValues.total_price_excluding_optional_support = values[33];
            dailyValues.total_price_including_optional_support = values[34];
            dailyValues.students_reached = values[35];

            dailyValues.total_donations = values[36];
            dailyValues.num_donors = values[37];
            dailyValues.eligible_double_your_impact_match = values[38];
            dailyValues.eligible_almost_home_match = values[39];
            dailyValues.funding_status = values[40];
            dailyValues.date_posted = values[41];
            dailyValues.date_completed = values[42];
            dailyValues.date_thank_you_packet_mailed = values[43];
            //dailyValues.date_expiration = values[44].ToString();
           

            return dailyValues;
        }
    }
}