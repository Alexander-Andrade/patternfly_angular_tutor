directives = angular.module('directives');

directives.directive('resourcesCard', function() {
    return {
        templateUrl: '_resources_card.html',
        scope: {
            node: '=',
            title: '@',
            billing: '=',
            progressBarsData: '=',
            nextUrl: '&'
        }
    };
});
