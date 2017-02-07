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
                onEnter: ['$state','$stateParams','suiData', function($state, $stateParams, suiData){

                    var path = $stateParams.path;
                    console.log(path);

                    // my tenant path
                    if(path == 'undefined' || path.length== 0){
                        suiData.node = [suiData];
                        return;
                    }
                    // locations path
                    if(path == "locations"){
                        suiData.node = suiData.children;
                    }
                    var params = $stateParams.path.split('/');

                }]
            });

            $urlRouterProvider.otherwise('/');
    }]);
// {tenantPath:[a-zA-Z0-9/]*}/user'

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