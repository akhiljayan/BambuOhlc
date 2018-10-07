(function () {
    angular.module('app').component('showChart', {
        controller: 'ShowChartController',
        bindings: {
            data: '<',
        },
        controllerAs: 'vm',
        templateUrl: 'views/showChart/showChart.html'
    });
})();