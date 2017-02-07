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
                    //tenants path
                    if(urlHelper.isTenantsPath(path)){
                        console.log("tenants path!")
                    }
                    //miggroups path
                    if(urlHelper.isMiqGroupsPath(path)){
                        console.log("miggroups path!");
                    }
                    if(urlHelper.isProjectsPath(path)){
                        console.log("projects path!");
                    }
                    if(urlHelper.isVMsPath(path)){
                        console.log("vms path!");
                    }
                    //users
                    if(urlHelper.isUsersPath(path)){
                        console.log("users path!");
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
        getTenantsRegStr: function () {
            return this.locationsPath()+"\/tenants((\/([0-9])+\/tenants)?)+";
        },
        getMiqGroupsRegStr: function () {
            return this.getTenantsRegStr()+"\/([0-9])+"+"\/miqgroups";
        },
        getProjectsRegStr: function () {
            return this.getTenantsRegStr()+"\/([0-9])+"+"\/projects";
        },
        getUsersRegStr: function(){
            return this.getMiqGroupsRegStr()+"\/([0-9])+"+"\/users";
        },
        isAccountPath: function (path) {
            return this.accountPath() === path;
        },
        isLocationsPath: function(path){
            return this.locationsPath() === path;
        },
        isTenantsPath: function(path){
            var re = new RegExp("^"+this.getTenantsRegStr()+"$");
            return re.test(path)
        },
        isMiqGroupsPath: function(path){
            var re = new RegExp("^"+this.getMiqGroupsRegStr()+"$");
            return re.test(path)
        },
        isProjectsPath: function(path){
            var re = new RegExp("^"+this.getProjectsRegStr()+"$");
            return re.test(path)
        },
        isUsersPath: function (path) {
            var re = new RegExp("^"+this.getUsersRegStr()+"$");
            return re.test(path)
        },
        isVMsPath: function (path) {
            var re1 = new RegExp("^"+this.getProjectsRegStr()+"\/([0-9])+"+"\/vms"+"$");
            var re2 = new RegExp("^"+this.getUsersRegStr()+"\/([0-9])+"+"\/vms"+"$");
            return re1.test(path) || re2.test(path);
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