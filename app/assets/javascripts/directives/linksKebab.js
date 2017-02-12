directives = angular.module('directives');

directives.directive('linksKebab', function(){
    return {
        templateUrl: '_kebab.html',
        scope: {
            links: '='
        }
    }
});