// (function() {
//     'use strict';
    var resourceApp = angular.module('app', ['ui.router', 'ngResource', 'patternfly.charts', 'patternfly.card', 'templates']);

    resourceApp.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('account',{
                url:'/',
                templateUrl:'test.html',
                controller: 'accountCtrl'
            });
        $urlRouterProvider.otherwise('/account');
    }]);



    resourceApp.controller('accountCtrl', accountCtrl);
    accountCtrl.$inject = ['$scope','$routeParams','$location'];
    function accountCtrl($scope, $routeParams, $location) {
        console.log("Here");
        $scope.node = null;
        $http.get('sui_account_mgmt_example.json').success(function(data) {
            $scope.node = data;
            console.log($scope.node)
        });
    }

// })();