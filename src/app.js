// app.routes.js
(function () {

    var appModule = angular.module("app", [
        "ui.router",
        "ngCookies",
        "nvd3"
    ]);

    appModule.config([
        '$stateProvider', '$urlRouterProvider', 
        function ($stateProvider, $urlRouterProvider) {
    
            // Default route (overrided below if user has permission)
            $urlRouterProvider.otherwise("/welcome");
    
            //Welcome page
            $stateProvider.state('welcome', {
                url: '/welcome',
                template: '<home></home>',
            });

            $stateProvider.state('forminput', {
                url: '/form',
                template: '<form-input></form-input>',
            });

            $stateProvider.state('jsoninput', {
                url: '/json',
                template: '<json-input></json-input>',
            });

            $stateProvider.state('showsecretsanta', {
                url: '/showsecretsanta',
                template: '<show-secret-santa></show-secret-santa>',
                params : {data: []}
            });
        }
    ]);

    appModule.run(["$rootScope", "$state",function ($rootScope, $state) {
        $rootScope.$state = $state;
    
    
        $rootScope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
    }]);


})();