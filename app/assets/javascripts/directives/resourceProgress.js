directives = angular.module('directives');

directives.directive('resourceProgress', function() {
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