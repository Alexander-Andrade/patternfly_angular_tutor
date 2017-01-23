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

resourceApp.config( function($routeProvider) {
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
});

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

resourceApp.service('urlHelper', ['$location', function ($location) {
        return {
            getBaseUrl: function() {
                var absUrl = $location.absUrl();
                var spletedUrl = absUrl.split('#');
                return spletedUrl[0]+'#!';
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
            }

        };
}]);



resourceApp.controller('rootCtrl', ['$scope','$routeParams','$location','resourcesServ','urlHelper', function($scope, $routeParams,$location,resourcesServ, urlHelper){
    $scope.data = [resourcesServ.root];
    console.log("here");
    $scope.getBreadcrumbList = function(){
        return [
            {url: $location.absUrl(), name: 'Home'}
        ];
    };

    $scope.breadcrumbList = $scope.getBreadcrumbList();


    $scope.nextUrl = function(){
        return urlHelper.locationsPath();
    }
}]);


resourceApp.controller('locationsCtrl', ['$scope','$routeParams','$location','resourcesServ','urlHelper', function($scope, $routeParams, $location, resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations;

    $scope.getBreadCrumbList = function () {
        return [
            {url: urlHelper.topPath(), name: 'Home'},
            {url: $location.absUrl(), name: 'Locations'}
        ];
    };

    $scope.breadcrumbList = $scope.getBreadCrumbList();


    $scope.nextUrl = function(location_id){
        return urlHelper.departmentsPath(location_id);
    }
}]);

resourceApp.controller('departmentsCtrl', ['$scope','$routeParams', '$location','resourcesServ', 'urlHelper', function($scope, $routeParams,$location,resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations[$routeParams.location_id-1].departments;

    $scope.getBreadCrumbList = function () {
        var urlLeft = urlHelper.getBaseUrl();
        return [
            {url: urlHelper.topPath(), name: 'Home'},
            {url: urlHelper.locationsPath() , name: 'Locations'},
            {url: $location.absUrl(), name: 'Departments'}
        ];
    };

    $scope.breadcrumbList = $scope.getBreadCrumbList();

    $scope.nextUrl = function(department_id){
        return $location.absUrl()+'/'+department_id+'/divisions';
    }
}]);

resourceApp.controller('divisionsCtrl', ['$scope','$routeParams', '$location','resourcesServ', 'urlHelper', function($scope, $routeParams,$location,resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations[$routeParams.location_id-1].departments[$routeParams.department_id-1].divisions;


    $scope.getBreadCrumbList = function () {
        var urlLeft = urlHelper.getBaseUrl();
        return [
            {url: urlHelper.topPath(), name: 'Home'},
            {url: urlHelper.locationsPath(), name: 'Locations'},
            {url: urlHelper.departmentsPath($routeParams.location_id), name: 'Departments'},
            {url: $location.absUrl(), name: 'Divisions'}
        ];
    };

    $scope.breadcrumbList = $scope.getBreadCrumbList();

    $scope.nextUrl = function(department_id){
        return $location.absUrl()+'/'+division_id+'/sectors';
    }
}]);

resourceApp.controller('sectorsCtrl', ['$scope','$routeParams', '$location','resourcesServ', 'urlHelper', function($scope, $routeParams,$location,resourcesServ, urlHelper) {
    $scope.data = resourcesServ.root.locations[$routeParams.location_id-1].departments[$routeParams.department_id-1].divisions[$routeParams.division_id-1].sectors;
    console.log($scope.data);

    $scope.getBreadCrumbList = function () {
        var urlLeft = urlHelper.getBaseUrl();
        return [
            {url: urlHelper.topPath(), name: 'Home'},
            {url: urlHelper.locationsPath(), name: 'Locations'},
            {url: urlHelper.departmentsPath($routeParams.location_id), name: 'Departments'},
            {url: urlHelper.divisionsPath($routeParams.location_id,$routeParams.department_id), name: 'Divisions'},
            {url: $location.absUrl(), name: 'Sectors'}
        ];
    };

    $scope.breadcrumbList = $scope.getBreadCrumbList();

    $scope.nextUrl = function(department_id){
        return $location.absUrl()+'/'+department_id+'/divisions';
    }
}]);






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

$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').focus()
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});