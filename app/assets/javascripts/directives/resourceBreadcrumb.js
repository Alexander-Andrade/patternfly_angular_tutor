directives = angular.module('directives');

directives.directive('resourceBreadcrumb', function() {
    return {
        templateUrl: '_resource_breadcrumb.html',
        scope: {
            list: '='
        }
    }
});