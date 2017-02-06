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
                // resolve:{
                //     ctrlData:['$state', '$stateParams' ,function ($state, $stateParams) {
                //         console.log("resolve ")
                //     }]
                // },
                onEnter: ['$state','$stateParams','suiDataServ', function($state, $stateParams, suiDataServ){
                    suiDataServ.async().then(function(d) {
                        var path = $stateParams.path;
                        console.log(path);
                        var rootNode = d;

                        // my tenant path
                        if(path == 'undefined' || path.length== 0){
                            suiDataServ.node = [rootNode];
                            return;
                        }
                        // locations path
                        if(path == "locations"){
                            suiDataServ.node = rootNode.children;
                        }
                    });
                    // var params = $stateParams.path.split('/');
                    // console.log(params)
                }]
            });

            $urlRouterProvider.otherwise('/');
    }]);
// {tenantPath:[a-zA-Z0-9/]*}/user'

    resourceApp.factory('suiDataServ', suiDataServ);
    suiDataServ.$inject = ['$http'];
    function suiDataServ($http) {
        var suiDataServ = {
            async: function() {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get('sui_account_mgmt_example.json').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    // console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            }
        };
        return suiDataServ;
    }


    resourceApp.controller('accountCtrl', accountCtrl);
    accountCtrl.$inject = ['$scope', 'suiDataServ', '$state', '$stateParams'];
    function accountCtrl($scope, suiDataServ, $state, $stateParams) {
        suiDataServ.async().then(function(d) {
                console.log(suiDataServ.node);
            // console.log(suiDataServ.node);
            // console.log(parameters);
            // console.log($state.current);
            // console.log($stateParams);
            // console.log($state.params);
        });

    }

// })();