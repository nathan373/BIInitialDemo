// <reference path="../angular.js" />  
/// <reference path="../angular.min.js" />   
/// <reference path="../angular-animate.js" />   
/// <reference path="../angular-animate.min.js" />   
angular.module("BIAngularModule", ['ngAnimate'])
.controller("MainControlller", function ($scope, $timeout, $rootScope, $window, $http) {
    $scope.date = new Date();
    $scope.MyName = "Nathan";
    // For Hotel Room Details
    $scope.RoomID = 0;
    $scope.RoomNo = "";
    $scope.RoomType = "";
    $scope.Prize = "";

    $scope.DeviceNo = 0;

    // For Hotel Room Bookin Details
    $scope.BookingID = 0;
    $scope.RoomIDs = "";

    $scope.BookedDateFR = $scope.date;
    $scope.BookedDateTO = $scope.date;
    $scope.BookingStatus = "";
    $scope.PaymentStatus = "";
    $scope.AdvancePayed = "";
    $scope.TotalAmountPayed = "";

    $scope.DeviceSummaryData = "";
    $scope.CSVData = "";

    //getCSVData();
    getDevicesSummary();

    // This method is to get all the Room Details. 
    selectRoomDetails('');
    selectRoomBookingDetails('');
    selectAvailableStatus('');

    //makeGraphs();

    function getDevicesSummary() {
        $http.get('/api/DeviceGroup/getDevicesSummary/').success(function (data) {
            $scope.DeviceSummaryData = data;
            if ($scope.DeviceSummaryData.length > 0) {
            }
        })
   .error(function () {
       $scope.error = "An Error has occured while loading posts!";
   });
    }


    function getCSVData() {
        $http.get('/api/DeviceGroup/getCSVData/').success(function (data) {
            $scope.CSVData = data;
            if ($scope.CSVData.length > 0) {
            }
        })
   .error(function () {
       $scope.error = "An Error has occured while loading posts!";
   });
    }

    //charts


    function selectRoomDetails(RoomNo) {
        $http.get('/api/HotelAPI/getHotelRooms/', { params: { RoomNo: RoomNo } }).success(function (data) {
            $scope.HotelRoomData = data;
            if ($scope.HotelRoomData.length > 0) {
            }
        })
   .error(function () {
       $scope.error = "An Error has occured while loading posts!";
   });

    }

    function selectRoomBookingDetails(RoomID) {
        $http.get('/api/HotelAPI/getRoomBookingDetails/', { params: { RoomID: RoomID } }).success(function (data) {
            $scope.RoomBookingData = data;
            if ($scope.RoomBookingData.length > 0) {
            }
        })
  .error(function () {
      $scope.error = "An Error has occured while loading posts!";
  });
    }


    function selectAvailableStatus(RoomNo) {
        $http.get('/api/HotelAPI/getRoomDashboardDetails/', { params: { RoomNo: RoomNo } }).success(function (data) {
            $scope.RoomAvailableData = data;
            if ($scope.RoomAvailableData.length > 0) {
            }
        })
  .error(function () {
      $scope.error = "An Error has occured while loading posts!";
  });
    }

    //clear all the control values after insert and edit.
    function cleardetails() {
        // For Hotel Room Details
        $scope.RoomID = 0;
        $scope.RoomNo = "";
        $scope.RoomType = "";
        $scope.Prize = "";

        $scope.IsFormSubmitted = false;
        $scope.IsFormSubmitted2 = false;
        // For Hotel Room Bookin Details
        $scope.BookingID = 0;
        $scope.RoomIDs = "";
        $scope.BookedDateFR = $scope.date;
        $scope.BookedDateTO = $scope.date;
        $scope.BookingStatus = "";
        $scope.PaymentStatus = "";
        $scope.AdvancePayed = "";
        $scope.TotalAmountPayed = "";

        $scope.IsFormValid = true;
        $scope.IsFormValid2 = true;
    }


    $scope.IsFormSubmitted = false;
    $scope.IsFormSubmitted2 = false;
    $scope.IsFormValid = false;
    $scope.IsFormValid2 = false;

    //Edit RoomBooking edit  Details
    $scope.roomBookingEdit = function roomBookingEdit(BookingID, RoomID, BookedDateFR, BookedDateTO, BookingStatus, PaymentStatus, AdvancePayed, TotalAmountPayed) {
        cleardetails();
        $scope.IsFormValid = true;
        $scope.showEditMusics = true;
        $scope.BookingID = BookingID;
        $scope.RoomIDs = RoomID;
        $scope.BookedDateFR = BookedDateFR;
        $scope.BookedDateTO = BookedDateTO;
        $scope.BookingStatus = BookingStatus;
        $scope.PaymentStatus = PaymentStatus;
        $scope.AdvancePayed = AdvancePayed;
        $scope.TotalAmountPayed = TotalAmountPayed;
    }

    //Delete RoomBooking Selete Detail
    $scope.roomBookingDelete = function roomBookingDelete(BookingID) {
        cleardetails();
        $scope.BookingID = BookingID;
        var delConfirm = confirm("Are you sure you want to delete the Room Booking Data ?");
        if (delConfirm == true) {
            $http.get('/api/HotelAPI/deleteROom/', { params: { BookingID: $scope.BookingID } }).success(function (data) {
                alert("Room Booking Detail Deleted Successfully!!");
                cleardetails();
                selectRoomBookingDetails('');
            })
      .error(function () {
          $scope.error = "An Error has occured while loading posts!";
      });

        }
    }

    //Form Validation
    $scope.$watch("f1.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    });

    //Save Room Booking
    $scope.saveroomBooking = function () {
        $scope.IsFormSubmitted = true;
        $scope.Message = "";
        if ($scope.IsFormValid) {
            $http.get('/api/HotelAPI/insertRoomBooking/', { params: { BookingID: $scope.BookingID, RoomID: $scope.RoomIDs, BookedDateFR: $scope.BookedDateFR, BookedDateTO: $scope.BookedDateTO, BookingStatus: $scope.BookingStatus, PaymentStatus: $scope.PaymentStatus, AdvancePayed: $scope.AdvancePayed, TotalAmountPayed: $scope.TotalAmountPayed } }).success(function (data) {
                $scope.bookingInserted = data;
                alert($scope.bookingInserted);
                cleardetails();
                selectRoomBookingDetails('');
            })
             .error(function () {
                 $scope.error = "An Error has occured while loading posts!";
             });
        }
        else {
            $scope.Message = "All the fields are required.";
        }
    };

    //Form Validation
    $scope.$watch("f2.$valid", function (isValid) {
        $scope.IsFormValid2 = false;
    });

    //Save Hotel Room
    $scope.saveRoom = function () {
        $scope.IsFormSubmitted2 = true;
        $scope.Message = "";
        if ($scope.IsFormValid2 = false) {
            $http.get('/api/HotelAPI/insertHotelRoom/', { params: { RoomNo: $scope.RoomNo, RoomType: $scope.RoomType, Prize: $scope.Prize } }).success(function (data) {
                $scope.roomInserted = data;
                alert($scope.roomInserted);
                cleardetails();
                selectRoomDetails('');
            })
        .error(function () {
            $scope.error = "An Error has occured while loading posts!";
        });


        }
        else {
            $scope.Message = "All the fields are required.";
        }

    };


    function makeGraphs() {

        //Start Transformations
        var dataSet = $scope.CSVData;
        var dateFormat = d3.time.format("%m/%d/%Y");
        dataSet.forEach(function (d) {
            d.date_posted = dateFormat.parse(d.date_posted);
            d.date_posted.setDate(1);
            d.total_donations = +d.total_donations;
        });

        //Create a Crossfilter instance
        var ndx = crossfilter(dataSet);

        //Define Dimensions
        var datePosted = ndx.dimension(function (d) { return d.date_posted; });
        var gradeLevel = ndx.dimension(function (d) { return d.grade_level; });
        var resourceType = ndx.dimension(function (d) { return d.resource_type; });
        var fundingStatus = ndx.dimension(function (d) { return d.funding_status; });
        var povertyLevel = ndx.dimension(function (d) { return d.poverty_level; });
        n = ndx.dimension(function (d) { return d.school_state; });
        var totalDonations = ndx.dimension(function (d) { return d.total_donations; });


        //Calculate metrics
        var projectsByDate = datePosted.group();
        var projectsByGrade = gradeLevel.group();
        var projectsByResourceType = resourceType.group();
        var projectsByFundingStatus = fundingStatus.group();
        var projectsByPovertyLevel = povertyLevel.group();
        var stateGroup = state.group();

        var all = ndx.groupAll();

        //Calculate Groups
        var totalDonationsState = state.group().reduceSum(function (d) {
            return d.total_donations;
        });

        var totalDonationsGrade = gradeLevel.group().reduceSum(function (d) {
            return d.grade_level;
        });

        var totalDonationsFundingStatus = fundingStatus.group().reduceSum(function (d) {
            return d.funding_status;
        });



        var netTotalDonations = ndx.groupAll().reduceSum(function (d) { return d.total_donations; });

        //Define threshold values for data
        var minDate = datePosted.bottom(1)[0].date_posted;
        var maxDate = datePosted.top(1)[0].date_posted;

        console.log(minDate);
        console.log(maxDate);

        //Charts
        var dateChart = dc.lineChart("#date-chart");
        var gradeLevelChart = dc.rowChart("#grade-chart");
        var resourceTypeChart = dc.rowChart("#resource-chart");
        var fundingStatusChart = dc.pieChart("#funding-chart");
        var povertyLevelChart = dc.rowChart("#poverty-chart");
        var totalProjects = dc.numberDisplay("#total-projects");
        var netDonations = dc.numberDisplay("#net-donations");
        var stateDonations = dc.barChart("#state-donations");


        selectField = dc.selectMenu('#menuselect')
              .dimension(state)
              .group(stateGroup);

        dc.dataCount("#row-selection")
         .dimension(ndx)
         .group(all);


        totalProjects
            .formatNumber(d3.format("d"))
            .valueAccessor(function (d) { return d; })
            .group(all);

        netDonations
            .formatNumber(d3.format("d"))
            .valueAccessor(function (d) { return d; })
            .group(netTotalDonations)
            .formatNumber(d3.format(".3s"));

        dateChart
            //.width(600)
            .height(220)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(datePosted)
            .group(projectsByDate)
            .renderArea(true)
            .transitionDuration(500)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .elasticY(true)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .xAxisLabel("Year")
            .yAxis().ticks(6);

        resourceTypeChart
            //.width(300)
            .height(220)
            .dimension(resourceType)
            .group(projectsByResourceType)
            .elasticX(true)
            .xAxis().ticks(5);

        povertyLevelChart
            //.width(300)
            .height(220)
            .dimension(povertyLevel)
            .group(projectsByPovertyLevel)
            .xAxis().ticks(4);

        gradeLevelChart
            //.width(300)
            .height(220)
            .dimension(gradeLevel)
            .group(projectsByGrade)
            .xAxis().ticks(4);


        fundingStatusChart
          .height(220)
          //.width(350)
          .radius(90)
          .innerRadius(40)
          .transitionDuration(1000)
          .dimension(fundingStatus)
          .group(projectsByFundingStatus);


        stateDonations
            //.width(800)
            .height(220)
            .transitionDuration(1000)
            .dimension(state)
            .group(totalDonationsState)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .centerBar(false)
            .gap(5)
            .elasticY(true)
            .x(d3.scale.ordinal().domain(state))
            .xUnits(dc.units.ordinal)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .ordering(function (d) { return d.value; })
            .yAxis().tickFormat(d3.format("s"));

        dc.renderAll();

    };

});