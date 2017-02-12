directives = angular.module('directives');

directives.directive('resourceModal', function() {
    return {
        templateUrl: '_resource_modal.html',
        scope: {
            data: '='
        }
    }
});