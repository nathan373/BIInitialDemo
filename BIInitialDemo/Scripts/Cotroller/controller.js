// <reference path="../angular.js" />  
/// <reference path="../angular.min.js" />   
/// <reference path="../angular-animate.js" />   
/// <reference path="../angular-animate.min.js" />   
var app;
(function () {
    app = angular.module("BIAngularModule", ['ngAnimate']);
})();


app.controller("MainControlller", function ($scope, $timeout, $rootScope, $window, $http) {
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

    // This method is to get all the Room Details. 
    selectRoomDetails('');
    selectRoomBookingDetails('');
    selectAvailableStatus('');

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

})


//app.controller("apiControlller", function ($scope, $timeout, $rootScope, $window, $http) {
//    //getCSVData();
//    getDevicesSummary();

//    function getDevicesSummary() {
//        $http.get('/api/DeviceGroup/getDevicesSummary/').success(function (data) {
//            $scope.DeviceSummaryData = data;
//            if ($scope.DeviceSummaryData.length > 0) {
//            }
//        })
//   .error(function () {
//       $scope.error = "An Error has occured while loading posts!";
//   });
//    }

//})


//app.controller('RandomDataController', function ($scope) {
//    $scope.options = {
//        chart: {
//            type: 'lineChart',
//            height: 180,
//            margin: {
//                top: 20,
//                right: 20,
//                bottom: 40,
//                left: 55
//            },
//            x: function (d) { return d.x; },
//            y: function (d) { return d.y; },
//            useInteractiveGuideline: true,
//            duration: 500,
//            yAxis: {
//                tickFormat: function (d) {
//                    return d3.format('.01f')(d);
//                }
//            }
//        }
//    };

//    $scope.options1 = angular.copy($scope.options);
//    $scope.options1.chart.duration = 0;
//    $scope.options1.chart.yDomain = [-1, 1];

//    $scope.data = [{ values: [], key: 'Random Walk' }];

//    $scope.run = true;

//    var x = 0;
//    setInterval(function () {
//        if (!$scope.run) return;
//        $scope.data[0].values.push({ x: x, y: Math.random() - 0.5 });
//        if ($scope.data[0].values.length > 20) $scope.data[0].values.shift();
//        x++;

//        $scope.$apply(); // update both chart
//    }, 500);
//})
