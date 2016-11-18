angular.module("BIAngularModule")
.controller("apiControlller", function ($scope, $timeout, $rootScope, $window, $http) {
    //getCSVData();
    getDevicesSummary();

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

});