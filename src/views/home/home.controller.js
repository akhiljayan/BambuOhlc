(function () {
    angular.module('app').controller('HomeController', [
        '$state', '$scope', 'operations', '$http', '$cookies',
        function ($state, $scope, operations, $http, $cookies) {
            var vm = this;
            vm.header = 'Home sweet home!';
            vm.$onInit = onInit;
            vm.data = {};
            vm.selected = "";
            activate();

            function activate() {
                // Resolve start-up logic
            }

            vm.getData = function (symbol) {
                vm.url = operations.getApiUrl(symbol);
                $http.get(vm.url).then(function (response) {
                    vm.data = response.data;
                    if(vm.data){
                        operations.setCokieSymbol(symbol);
                        vm.selected = symbol;
                    }
                });
            }

            function onInit() {
                vm.symbols = operations.symbols;
                vm.cookieSymbol = operations.getCokieSymbol();
                vm.selected = vm.cookieSymbol
            }
        }
    ]);
})();