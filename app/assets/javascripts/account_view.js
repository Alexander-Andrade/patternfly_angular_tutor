// (function() {
//     'use strict';
    var resourceApp = angular.module('app', ['ui.router', 'ngResource', 'patternfly.charts', 'patternfly.card', 'templates']);

    resourceApp.config(['$stateProvider','$urlRouterProvider','$qProvider', function ($stateProvider, $urlRouterProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $stateProvider
            // .state('account',{
            //     url:'/',
            //     templateUrl:'test.html',
            //     controller: 'accountCtrl'
            // })
            // .state('account.locations',{
            //     url:'locations',
            //     templateUrl:'test.html',
            //     controller: 'accountCtrl'
            // })
            // .state('account.locations.location',{
            //     url:'/{locationId}',
            //     templateUrl:'test.html',
            //     controller: 'accountCtrl'
            // })
            // .state('account.locations.location.tenants',{
            //     url:'/{tenantPath: [a-zA-Z0-9/]*}',
            //     templateUrl:'test.html',
            //     controller: 'accountCtrl'
            // });
            // .state('home',{
            //     url:'/',
            //     templateUrl:'test.html',
            //     controller: 'accountCtrl'
            // })
            .state('account',{
                url:'/{path:.*}',
                templateUrl:'test.html',
                controller: 'accountCtrl',
                resolve:{
                    suiData:['suiDataServ' ,function (suiDataServ) {
                        return suiDataServ.getPromise();
                    }]
                },
                onEnter: ['$state','$stateParams','suiData','urlHelper', function($state, $stateParams, suiData, urlHelper){
                    var path = urlHelper.accountPath()+$stateParams.path;
                    console.log(path);

                    // my tenant path
                    if(urlHelper.isAccountPath(path)){
                        suiData.node = [suiData];
                        return;
                    }
                    // locations path
                    if(urlHelper.isLocationsPath(path)){
                        suiData.node = suiData.children;
                        return;
                    }
                    if(urlHelper.isTenantsPath(path)){
                        console.log("tenant path!")
                    }
                    var params = $stateParams.path.split('/');

                }]
            });

            $urlRouterProvider.otherwise('/');
    }]);

resourceApp.service('urlHelper', urlHelper);
urlHelper.$inject = ['$location'];
function urlHelper($location) {
    return {
        getBaseUrl: function () {
            var absUrl = $location.absUrl();
            return absUrl.split('#')[0] + '#!';
        },
        accountPath: function () {
            return this.getBaseUrl() + '/';
        },
        locationsPath: function () {
            return this.accountPath()+'locations';
        },
        isAccountPath: function (path) {
            return this.accountPath() === path;
        },
        isLocationsPath: function(path){
            return this.locationsPath() === path;
        },
        isTenantsPath: function(path){
            var locationsPath = this.locationsPath();
            var re = new RegExp("^"+locationsPath+"(\/tenants(\/(\d)+)?)+"+"$");
            console.log(re);
            return re.test(path)
        }
    }
}

    resourceApp.service('suiDataServ', suiDataServ);
    suiDataServ.$inject = ['$http'];
    function suiDataServ($http) {
        //singleton (json only one time)
        this.promise = null;

        function makeRequest() {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get('sui_account_mgmt_example.json').then(function (response) {
                // The then function here is an opportunity to modify the response
                // console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
        }
        this.getPromise = function (update) {
            if(update || !this.promise){
                console.log("request !!!");
                this.promise = makeRequest();
            }
            return this.promise;
        }
    }

    resourceApp.controller('accountCtrl', accountCtrl);
    accountCtrl.$inject = ['$scope', 'suiData', '$state', '$stateParams'];
    function accountCtrl($scope, suiData, $state, $stateParams) {
        $scope.data = suiData.node;
    }

// })();