// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require angular
//= require angular-resource
//= require angular-route
//= require angular-rails-templates
//= require_tree ./templates
//= require patternfly
//= require turbolinks
//= require_tree .




resourceApp = angular.module('resource', ['ngRoute','ngResource','patternfly.charts','patternfly.card','templates']);

resourceApp.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '_resource_view.html',
            controller: 'rootCtrl'
        })
        .when('/locations', {
            templateUrl: '_resource_view.html',
            controller: 'locationsCtrl'
        })
        .when('/locations/:location_id', {
            templateUrl: '_resource_view.html',
            controller: 'locationsCtrl'
        })
        .when('/locations/:location_id/departments', {
            templateUrl: '_resource_view.html',
            controller: 'departmentsCtrl'
        })
        .when('/locations/:location_id/departments/:department_id', {
            templateUrl: '_resource_view.html',
            controller: 'departmentsCtrl'
        })
        .when('/locations/:location_id/departments/:department_id/divisions', {
            templateUrl: '_resource_view.html',
            controller: 'divisionsCtrl'
        })
        .when('/locations/:location_id/departments/:department_id/divisions/:divisions_id', {
            templateUrl: '_resource_view.html',
            controller: 'divisionsCtrl'
        })
        .when('/locations/:location_id/departments/:department_id/divisions/:division_id/sectors', {
            templateUrl: '_resource_view.html',
            controller: 'sectorsCtrl'
        })
        .when('/locations/:location_id/departments/:department_id/divisions/:division_id/sectors/:sector_id', {
            templateUrl: '_resource_view.html',
            controller: 'sectorsCtrl'
        })
        .when('/locations/:location_id/departments/:department_id/divisions/:division_id/sectors/:sector_id/projects', {
            templateUrl: '_resource_view.html',
            controller: 'projectsCtrl'
        })
        .when('/locations/:location_id/departments/:department_id/divisions/:division_id/sectors/:sector_id/projects/:project_id', {
            templateUrl: '_resource_view.html',
            controller: 'projectsCtrl'
        })
        .when('/locations/:location_id/departments/:department_id/divisions/:division_id/sectors/:sector_id/projects/:project_id/users', {
            templateUrl: '_resource_view.html',
            controller: 'usersCtrl'
        })
        .when('/locations/:location_id/departments/:department_id/divisions/:division_id/sectors/:sector_id/projects/:project_id/users/:user_id', {
            templateUrl: '_resource_view.html',
            controller: 'usersCtrl'
        })
        .when('/locations/:location_id/departments/:department_id/divisions/:division_id/sectors/:sector_id/projects/:project_id/users/:user_id/vms', {
            templateUrl: '_resource_view.html',
            controller: 'vmsCtrl'
        })
        .when('/locations/:location_id/departments/:department_id/divisions/:division_id/sectors/:sector_id/projects/:project_id/users/:user_id/:vms_id', {
            templateUrl: '_resource_view.html',
            controller: 'vmsCtrl'
        })
        .otherwise({
            redirectto:'/'
        });
}]);

resourceApp.service('resourcesServ', function () {
    this.root = {
        name: 'Top',
        price: {
            current: 3000,
            next: 6000
        },
        resources: [
            {
                title: 'SVM',
                reserved_perc: 80,
                used_perc: 30,
                reserved: 200,
                total: 230
            },
            {
            title: 'Storage',
                reserved_perc: 90,
                used_perc: 60,
                reserved: 10,
                total: 15
            },
            {
                title: 'Hours',
                    reserved_perc: 100,
                    used_perc: 30,
                    reserved: 40,
                    total: 50
            }
        ],
        locations: [{
            name: 'Location1',
            price: {
                current: 10,
                next: 25
            },
            resources: [
                {
                    title: 'SVM',
                    reserved_perc: 80,
                    used_perc: 30,
                    reserved: 200,
                    total: 230
                },
                {
                    title: 'Storage',
                    reserved_perc: 90,
                    used_perc: 60,
                    reserved: 10,
                    total: 15
                },
                {
                    title: 'Hours',
                    reserved_perc: 100,
                    used_perc: 30,
                    reserved: 40,
                    total: 50
                }
            ],
            departments: [{
                name: 'Department1',
                price: {
                    current: 10,
                    next: 25
                },
                resources: [
                    {
                        title: 'SVM',
                        reserved_perc: 80,
                        used_perc: 30,
                        reserved: 80,
                        total: 100
                    },
                    {
                        title: 'Storage',
                        reserved_perc: 90,
                        used_perc: 60,
                        reserved: 9,
                        total: 10
                    },
                    {
                        title: 'Hours',
                        reserved_perc: 100,
                        used_perc: 30,
                        reserved: 20,
                        total: 30
                    }
                ],
                divisions:[
                    {
                        name: 'Division1',
                        price: {
                            current: 10,
                            next: 25
                        },
                        resources: [
                            {
                                title: 'SVM',
                                reserved_perc: 80,
                                used_perc: 30,
                                reserved: 80,
                                total: 100
                            },
                            {
                                title: 'Storage',
                                reserved_perc: 70,
                                used_perc: 60,
                                reserved: 9,
                                total: 10
                            },
                            {
                                title: 'Hours',
                                reserved_perc: 100,
                                used_perc: 30,
                                reserved: 20,
                                total: 30
                            }
                        ],
                        sectors:[
                            {
                                name: 'Sector1',
                                price: {
                                    current: 10,
                                    next: 25
                                },
                                resources: [
                                    {
                                        title: 'SVM',
                                        reserved_perc: 80,
                                        used_perc: 20,
                                        reserved: 40,
                                        total: 100
                                    },
                                    {
                                        title: 'Storage',
                                        reserved_perc: 70,
                                        used_perc: 44,
                                        reserved: 9,
                                        total: 10
                                    },
                                    {
                                        title: 'Hours',
                                        reserved_perc: 60,
                                        used_perc: 20,
                                        reserved: 20,
                                        total: 30
                                    }
                                ],
                                projects:[
                                    {
                                        name: 'Project1',
                                        price: {
                                            current: 10,
                                            next: 25
                                        },
                                        resources: [
                                            {
                                                title: 'SVM',
                                                reserved_perc: 80,
                                                used_perc: 20,
                                                reserved: 40,
                                                total: 100
                                            },
                                            {
                                                title: 'Storage',
                                                reserved_perc: 70,
                                                used_perc: 44,
                                                reserved: 9,
                                                total: 10
                                            },
                                            {
                                                title: 'Hours',
                                                reserved_perc: 60,
                                                used_perc: 20,
                                                reserved: 20,
                                                total: 30
                                            }
                                        ],
                                        users: [
                                            {
                                                name: 'User1',
                                                price: {
                                                    current: 10,
                                                    next: 25
                                                },
                                                resources: [
                                                    {
                                                        title: 'SVM',
                                                        reserved_perc: 80,
                                                        used_perc: 20,
                                                        reserved: 40,
                                                        total: 100
                                                    },
                                                    {
                                                        title: 'Storage',
                                                        reserved_perc: 70,
                                                        used_perc: 44,
                                                        reserved: 9,
                                                        total: 10
                                                    },
                                                    {
                                                        title: 'Hours',
                                                        reserved_perc: 60,
                                                        used_perc: 20,
                                                        reserved: 20,
                                                        total: 30
                                                    }
                                                ],
                                                vms:[
                                                    {
                                                        name: 'VM1',
                                                        price: {
                                                            current: 10,
                                                            next: 25
                                                        },
                                                        resources: [
                                                            {
                                                                title: 'SVM',
                                                                reserved_perc: 80,
                                                                used_perc: 20,
                                                                reserved: 40,
                                                                total: 100
                                                            },
                                                            {
                                                                title: 'Storage',
                                                                reserved_perc: 70,
                                                                used_perc: 44,
                                                                reserved: 9,
                                                                total: 10
                                                            },
                                                            {
                                                                title: 'Hours',
                                                                reserved_perc: 60,
                                                                used_perc: 20,
                                                                reserved: 20,
                                                                total: 30
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        name: 'VM2',
                                                        price: {
                                                            current: 10,
                                                            next: 25
                                                        },
                                                        resources: [
                                                            {
                                                                title: 'SVM',
                                                                reserved_perc: 80,
                                                                used_perc: 20,
                                                                reserved: 40,
                                                                total: 100
                                                            },
                                                            {
                                                                title: 'Storage',
                                                                reserved_perc: 70,
                                                                used_perc: 44,
                                                                reserved: 9,
                                                                total: 10
                                                            },
                                                            {
                                                                title: 'Hours',
                                                                reserved_perc: 60,
                                                                used_perc: 20,
                                                                reserved: 20,
                                                                total: 30
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                name: 'User2',
                                                price: {
                                                    current: 10,
                                                    next: 25
                                                },
                                                resources: [
                                                    {
                                                        title: 'SVM',
                                                        reserved_perc: 80,
                                                        used_perc: 20,
                                                        reserved: 40,
                                                        total: 100
                                                    },
                                                    {
                                                        title: 'Storage',
                                                        reserved_perc: 70,
                                                        used_perc: 44,
                                                        reserved: 9,
                                                        total: 10
                                                    },
                                                    {
                                                        title: 'Hours',
                                                        reserved_perc: 60,
                                                        used_perc: 20,
                                                        reserved: 20,
                                                        total: 30
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        name: 'Project2',
                                        price: {
                                            current: 10,
                                            next: 25
                                        },
                                        resources: [
                                            {
                                                title: 'SVM',
                                                reserved_perc: 80,
                                                used_perc: 20,
                                                reserved: 40,
                                                total: 100
                                            },
                                            {
                                                title: 'Storage',
                                                reserved_perc: 70,
                                                used_perc: 44,
                                                reserved: 9,
                                                total: 10
                                            },
                                            {
                                                title: 'Hours',
                                                reserved_perc: 60,
                                                used_perc: 20,
                                                reserved: 20,
                                                total: 30
                                            }
                                        ]
                                    }

                                ]
                            },
                            {   name: 'Sector2',
                                price: {
                                    current: 10,
                                    next: 25
                                },
                                resources: [
                                    {
                                        title: 'SVM',
                                        reserved_perc: 80,
                                        used_perc: 30,
                                        reserved: 80,
                                        total: 100
                                    },
                                    {
                                        title: 'Storage',
                                        reserved_perc: 70,
                                        used_perc: 60,
                                        reserved: 9,
                                        total: 10
                                    },
                                    {
                                        title: 'Hours',
                                        reserved_perc: 70,
                                        used_perc: 30,
                                        reserved: 20,
                                        total: 30
                                    }
                                ]
                            }
                        ]
                    },
                    {name: 'Division2',
                        price: {
                            current: 10,
                            next: 25
                        },
                        resources: [
                            {
                                title: 'SVM',
                                reserved_perc: 60,
                                used_perc: 30,
                                reserved: 80,
                                total: 100
                            },
                            {
                                title: 'Storage',
                                reserved_perc: 90,
                                used_perc: 60,
                                reserved: 9,
                                total: 10
                            },
                            {
                                title: 'Hours',
                                reserved_perc: 100,
                                used_perc: 30,
                                reserved: 20,
                                total: 30
                            }
                        ]
                    }
                ]
                },
                {
                    name: 'Department2',
                        price: {
                    current: 10,
                        next: 25
                    },
                    resources: [{
                            title: 'SVM',
                            reserved_perc: 80,
                            used_perc: 30,
                            reserved: 80,
                            total: 100
                        },
                        {
                            title: 'Storage',
                            reserved_perc: 90,
                            used_perc: 60,
                            reserved: 9,
                            total: 10
                        },
                        {
                            title: 'Hours',
                            reserved_perc: 100,
                            used_perc: 30,
                            reserved: 20,
                            total: 30
                        }
                    ]
                }

            ]
            },
            {
                name: 'Location2',
                price: {
                    current: 45,
                    next: 78
                },
                resources: [
                    {
                        title: 'SVM',
                        reserved_perc: 70,
                        used_perc: 20,
                        reserved: 300,
                        total: 400
                    },
                    {
                        title: 'Storage',
                        reserved_perc: 90,
                        used_perc: 60,
                        reserved: 10,
                        total: 15
                    },
                    {
                        title: 'Hours',
                        reserved_perc: 100,
                        used_perc: 30,
                        reserved: 40,
                        total: 50
                    }
                ]
            }
        ]
    }
});

resourceApp.service('urlHelper', urlHelper);

urlHelper.$inject = ['$location'];

function urlHelper($location) {
    return {
        getBaseUrl: function() {
            var absUrl = $location.absUrl();
            return absUrl.split('#')[0]+'#!';
        },
        topPath: function () {
            return this.getBaseUrl()+'/';
        },
        locationsPath: function(){
            return this.topPath()+'locations';
        },
        departmentsPath: function(location_id){
            return  this.locationsPath()+'/'+location_id+'/departments';
        },
        divisionsPath: function(location_id, department_id){
            return this.departmentsPath(location_id)+'/'+department_id+'/divisions';
        },
        sectorsPath: function (location_id, department_id, division_id) {
            return this.divisionsPath(location_id, department_id)+'/'+division_id+'/sectors';
        },
        projectsPath: function (location_id, department_id, division_id, sector_id) {
            return this.sectorsPath(location_id, department_id, division_id)+'/'+sector_id+'/projects';
        },
        usersPath: function (location_id, department_id, division_id, sector_id, user_id) {
            return this.projectsPath(location_id, department_id, division_id, sector_id)+'/'+user_id+'/users';
        },
        getBreadcrumbList: function (url, routeParams,nameList) {
            var urlList = [
                this.topPath(),
                this.locationsPath(),
                this.departmentsPath(routeParams.location_id),
                this.divisionsPath(routeParams.location_id, routeParams.department_id),
                this.sectorsPath(routeParams.location_id, routeParams.department_id, routeParams.division_id),
                this.projectsPath(routeParams.location_id, routeParams.department_id, routeParams.division_id, routeParams.sector_id),
                this.usersPath(routeParams.location_id, routeParams.department_id, routeParams.division_id, routeParams.sector_id, routeParams.user_id)
            ];

            return nameList.map(function (e, i) {
               return {url: urlList[i], name: e}
            });
        }
    };
}

resourceApp.controller('rootCtrl', rootCtrl);
rootCtrl.$inject = ['$scope','$routeParams','$location','resourcesServ','urlHelper'];

function rootCtrl($scope, $routeParams,$location,resourcesServ, urlHelper) {
    $scope.data = [resourcesServ.root];

    $scope.breadcrumbList = urlHelper.getBreadcrumbList($location.url(),$routeParams,['Home']);
    console.log($scope.breadcrumbList);

    $scope.nextUrl = function(){
        return (typeof $scope.data !== 'undefined' && $scope.data.length>0) ? urlHelper.locationsPath(): $location.absUrl();
    }
}

resourceApp.controller('locationsCtrl', locationsCtrl);
locationsCtrl.$inject = ['$scope','$routeParams','$location','resourcesServ','urlHelper'];

function locationsCtrl($scope, $routeParams, $location, resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations;

    $scope.breadcrumbList = urlHelper.getBreadcrumbList($location.url(), $routeParams, ['Home','Location']);

    $scope.nextUrl = function(location_id){
        var deps = $scope.data[location_id-1].departments;
        return (typeof deps !== 'undefined' && deps.length>0) ? urlHelper.departmentsPath(location_id) : $location.absUrl();
    }
}

resourceApp.controller('departmentsCtrl', departmentsCtrl);
departmentsCtrl.$inject = ['$scope','$routeParams','$location','resourcesServ','urlHelper'];

function departmentsCtrl($scope, $routeParams,$location,resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations[$routeParams.location_id-1].departments;

    var nameList = ['Home','Location','Departments'];
    $scope.breadcrumbList = urlHelper.getBreadcrumbList($location.url(), $routeParams, nameList);

    $scope.nextUrl = function(department_id){
        var divs = $scope.data[department_id-1].divisions;
        return (typeof divs !== 'undefined' && divs.length>0) ? $location.absUrl()+'/'+department_id+'/divisions' : $location.absUrl();
    }
}


resourceApp.controller('divisionsCtrl', divisionsCtrl);
divisionsCtrl.$inject = ['$scope','$routeParams','$location','resourcesServ','urlHelper'];

function divisionsCtrl($scope, $routeParams,$location,resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations[$routeParams.location_id-1].departments[$routeParams.department_id-1].divisions;


    var nameList = ['Home','Location','Departments','Divisions'];
    $scope.breadcrumbList = urlHelper.getBreadcrumbList($location.url(), $routeParams, nameList);
    $scope.nextUrl = function(division_id){
        var sectors = $scope.data[division_id-1].sectors;
        return  (typeof sectors !== 'undefined' && sectors.length>0) ? $location.absUrl()+'/'+division_id+'/sectors' : $location.absUrl();
    }
}

resourceApp.controller('sectorsCtrl', sectorsCtrl);
sectorsCtrl.$inject = ['$scope','$routeParams','$location','resourcesServ','urlHelper'];

function sectorsCtrl($scope, $routeParams,$location,resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations[$routeParams.location_id-1].departments[$routeParams.department_id-1].divisions[$routeParams.division_id-1].sectors;

    var nameList = ['Home','Location','Departments','Divisions','Sectors'];
    $scope.breadcrumbList = urlHelper.getBreadcrumbList($location.url(), $routeParams, nameList);

    $scope.nextUrl = function(sector_id){
        var projects = $scope.data[sector_id-1].projects;
        return (typeof projects !== 'undefined' && projects.length>0) ?  $location.absUrl() + '/' + sector_id + '/projects' : $location.absUrl();
    }
}

resourceApp.controller('projectsCtrl', projectsCtrl);
projectsCtrl.$inject = ['$scope','$routeParams','$location','resourcesServ','urlHelper'];

function projectsCtrl($scope, $routeParams,$location,resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations[$routeParams.location_id-1].departments[$routeParams.department_id-1].
        divisions[$routeParams.division_id-1].sectors[$routeParams.sector_id-1].projects;

    var nameList = ['Home','Location','Departments','Divisions','Sectors','Projects'];
    $scope.breadcrumbList = urlHelper.getBreadcrumbList($location.url(), $routeParams, nameList);

    $scope.nextUrl = function(project_id){
        var users = $scope.data[project_id-1].users;
        return (typeof users !== 'undefined' && users.length>0) ? $location.absUrl() + '/' + project_id + '/users' : $location.absUrl();
    }
}

resourceApp.controller('usersCtrl', usersCtrl);
usersCtrl.$inject = ['$scope','$routeParams','$location','resourcesServ','urlHelper'];

function usersCtrl($scope, $routeParams,$location,resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations[$routeParams.location_id - 1].departments[$routeParams.department_id - 1].divisions[$routeParams.division_id - 1].sectors[$routeParams.sector_id - 1].projects[$routeParams.project_id - 1].users;

    var nameList = ['Home','Location','Departments','Divisions','Sectors','Projects','Users'];
    $scope.breadcrumbList = urlHelper.getBreadcrumbList($location.url(), $routeParams, nameList);

    $scope.nextUrl = function (user_id) {
        var vms = $scope.data[user_id-1].vms;
        return (typeof vms !== 'undefined' && vms.length > 0) ? $location.absUrl() + '/' + user_id + '/vms' : $location.absUrl();
    }
}


resourceApp.controller('vmsCtrl', vmsCtrl);
vmsCtrl.$inject = ['$scope','$routeParams','$location','resourcesServ','urlHelper'];

function vmsCtrl($scope, $routeParams,$location,resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations[$routeParams.location_id-1].departments[$routeParams.department_id-1].
        divisions[$routeParams.division_id-1].sectors[$routeParams.sector_id-1].projects[$routeParams.project_id-1].users[$routeParams.user_id-1].vms;

    var nameList = ['Home','Location','Departments','Divisions','Sectors','Projects','Users', 'VMs'];
    $scope.breadcrumbList = urlHelper.getBreadcrumbList($location.url(), $routeParams, nameList);

    $scope.nextUrl = function(){
        return $location.absUrl();
    }
}


resourceApp.directive('resourcesCard', function() {
    return {
        templateUrl: '_resources_card.html',
        scope: {
            id: '@',
            title: '@',
            price: '=',
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

$('.resource-modal').on('shown.bs.modal', function() {
    $('#myInput').focus()
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});