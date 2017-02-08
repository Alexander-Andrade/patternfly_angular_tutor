// (function() {
//     'use strict';
    var resourceApp = angular.module('app', ['ui.router', 'ngResource', 'patternfly.charts', 'patternfly.card', 'templates']);

    resourceApp.config(['$stateProvider','$urlRouterProvider','$qProvider', function ($stateProvider, $urlRouterProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $stateProvider
            .state('error', {
                url:'/error',
                templateUrl:'404.html'
            })
            .state('account',{
                url:'/mytenant{path:.*}',
                templateUrl:'test.html',
                controller: 'accountCtrl',
                resolve:{
                    rootNode:['rootNodeServ' ,function (rootNodeServ) {
                        return rootNodeServ.getPromise();
                    }]
                },
                onEnter: ['$state','urlHelper','$location', function($state, urlHelper, $location){
                    var url = $location.absUrl();

                    if(!(urlHelper.isCorrectPath(url))){
                        $state.go('error');
                    }
                }]
            });
    }]);

resourceApp.service('urlHelper', urlHelper);
urlHelper.$inject = ['$location'];
function urlHelper($location) {
    var self = this;
    self.numRegStr = "\/([0-9])+";
    return {
        getBaseUrl: function () {
            var absUrl = $location.absUrl();
            return absUrl.split('#')[0] + '#!';
        },
        accountPath: function () {
            return this.getBaseUrl() + '/mytenant';
        },
        locationsPath: function () {
            return this.accountPath()+'/locations';
        },
        getTenantsRegStr: function () {
            return this.locationsPath()+"\/([0-9])+"+"\/tenants((\/([0-9])+\/tenants)?)+";
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
            return this.accountPath() == path;
        },
        isLocationsPath: function(path){
            return this.locationsPath() == path;
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
        },
        isCorrectPath: function (path) {
            return  this.isAccountPath(path) || this.isLocationsPath(path) || this.isTenantsPath(path) ||
                    this.isMiqGroupsPath(path) || this.isProjectsPath(path)||
                    this.isVMsPath(path) || this.isUsersPath(path);
        }
    }
}

    resourceApp.service('rootNodeServ', rootNodeServ);
    rootNodeServ.$inject = ['$http'];
    function rootNodeServ($http) {
        //singleton (get json only one time)
        this.promise = null;

        function makeRequest() {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get('sui_account_mgmt_example.json').then(function (response) {
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
    accountCtrl.$inject = ['$scope', '$stateParams','rootNode'];
    function accountCtrl($scope, $stateParams,rootNode) {

        function findDataByPath(rootNode){
            var paramArgs = $stateParams.path.split('/').slice(1);
            // var curNode = rootNode;
            var node = rootNode;
            var children = [rootNode];

            var len = paramArgs.length;
            for(var i=0; i<len; i++){
                //if number
                if(!isNaN(paramArgs[i])){
                    node = children[(+paramArgs[i])-1];
                }
                else{
                    children = node.children.filter(function (child) {
                        return paramArgs[i].startsWith(child.type.toLowerCase());
                    });
                }
            }
            return children;
        }
        $scope.data = findDataByPath(rootNode);
        console.log($scope.data);
    }

// })();