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
                url:'/myaccount{path:.*}',
                templateUrl:'_resource_view.html',
                controller: 'accountCtrl',
                resolve:{
                    rootNode:['nodesServ' ,function (nodesServ) {
                        return nodesServ.getPromise();
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
            return this.getBaseUrl() + '/myaccount';
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
        // getProjectsRegStr: function () {
        //     return this.getTenantsRegStr()+"\/([0-9])+"+"\/projects";
        // },
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
        // isProjectsPath: function(path){
        //     var re = new RegExp("^"+this.getProjectsRegStr()+"$");
        //     return re.test(path)
        // },
        isUsersPath: function (path) {
            var re = new RegExp("^"+this.getUsersRegStr()+"$");
            return re.test(path)
        },
        isVMsPath: function (path) {
            // var re1 = new RegExp("^"+this.getProjectsRegStr()+"\/([0-9])+"+"\/vms"+"$");
            var re2 = new RegExp("^"+this.getUsersRegStr()+"\/([0-9])+"+"\/vms"+"$");
            return re1.test(path) || re2.test(path);
        },
        isCorrectPath: function (path) {
            return  this.isAccountPath(path) || this.isLocationsPath(path) || this.isTenantsPath(path) ||
                    this.isMiqGroupsPath(path) || /*this.isProjectsPath(path) ||*/
                    this.isVMsPath(path) || this.isUsersPath(path);
        }
    }
}

    resourceApp.service('nodesServ', nodesServ);
    nodesServ.$inject = ['$http'];
    function nodesServ($http) {
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

    resourceApp.service('nodesHelper', nodesHelper);
    nodesHelper.$inject = ['$stateParams'];
    function nodesHelper ($stateParams) {

        this.findDataByPath = function(rootNode){
            var paramArgs = $stateParams.path.split('/').slice(1);

            var node = rootNode;
            var children = [rootNode];

            var len = paramArgs.length;
            for(var i=0; i<len; i++){
                console.log("bunch");
                console.log(node);
                console.log(children);
                //if number
                if(!isNaN(paramArgs[i])){
                    node = children.find(function(elem, ind, arr) {
                        console.log("elem id");
                        console.log(elem.id);
                        console.log("param id");
                        console.log(+paramArgs[i]);
                        return elem.id==(+paramArgs[i]);
                    });
                    console.log("node");
                    console.log(node);
                }
                else{
                    children = node.children.filter(function (child) {
                        return paramArgs[i].startsWith(child.type.toLowerCase());
                    });
                }
                // console.log("node");
                // console.log(node);
                // console.log("children");
                // console.log(children);
            }
            return children;
        };

        this.findChildrenTypes = function (node) {
            if(node.hasOwnProperty('children')) {
                var types = node.children.map(function (child) {
                    return child.type;
                });
                return Array.from(new Set(types));
            }
            else{return []}
        };
    }

    resourceApp.controller('accountCtrl', accountCtrl);
    accountCtrl.$inject = ['$scope', '$location','rootNode', 'nodesHelper'];
    function accountCtrl($scope, $location,rootNode, nodesHelper) {

        $scope.data = nodesHelper.findDataByPath(rootNode);
        $scope.nextUrl = function (id) {
            var node = $scope.data.find(function (elem, i, arr) {
                return elem.id==id;
            });
            // var urls = [];
            var url = null;
            var childrenTypes = nodesHelper.findChildrenTypes(node);

            if(childrenTypes[0]=="location"){
                url= $location.absUrl()+'/'+'locations';
            }
            else {
                // var len = childrenTypes.length;
                // for (var i = 0; i < len; i++) {
                //     urls[i] = $location.absUrl() + '/' + id + '/' + childrenTypes[i] + "s";
                // }
                if(typeof childrenTypes !== 'undefined' && childrenTypes.length > 0) {
                    url = $location.absUrl() + '/' + id + '/' + childrenTypes[0] + "s";
                }else{
                    url = $location.absUrl();
                }
            }
            return url;
        };

    }


resourceApp.directive('resourcesCard', function() {
    return {
        templateUrl: '_resources_card.html',
        scope: {
            ident: '@',
            title: '@',
            billing: '=',
            progressBarsData: '=',
            nextUrl: '&'
        }
    };
});

resourceApp.directive('resourceProgress', function() {
    return {
        templateUrl: '_resource_progress.html',
        scope: {
            icon: '@',
            title: '@',
            data: '=',
            barColor1: '@',
            barColor2: '@',
            modalData: '='
        }
    }
});

resourceApp.directive('resourceModal', function() {
    return {
        templateUrl: '_resource_modal.html',
        scope: {
            data: '='
        }
    }
});

resourceApp.directive('resourceBreadcrumb', function() {
    return {
        templateUrl: '_resource_breadcrumb.html',
        scope: {
            list: '='
        }
    }
});

resourceApp.directive('linksKebab', function(){
    return {
        templateUrl: '_kebab.html',
        scope: {
            links: '='
        }
    }
});

$('.resource-modal').on('shown.bs.modal', function() {
    $('#myInput').focus()
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
// })();