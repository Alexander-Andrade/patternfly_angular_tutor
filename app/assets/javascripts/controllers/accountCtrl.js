controllers = angular.module('controllers');

controllers.controller('accountCtrl', accountCtrl);
accountCtrl.$inject = ['$scope', '$location','rootNode', 'nodesHelper', 'urlHelper'];
function accountCtrl($scope, $location,rootNode, nodesHelper, urlHelper) {
    $scope.data = nodesHelper.findDataByPath(rootNode);
    $scope.types = getTypes($scope.data);
    console.log($scope.types);
    $scope.nextUrl = function (node) {
        var path = $location.absUrl();

        if(urlHelper.isAccountPath(path)){
            return urlHelper.locationsPath();
        }
        if(urlHelper.isLocationsPath(path)){
            return path+'/'+node.id;
        }
        if(urlHelper.isLocationPath(path) || urlHelper.isTenantPath(path)){
            // console.log(node);
            switch(node.type){
                case "tenant":
                    return path+'/tenants/'+node.id;
                case "miqgroup":
                    return path+'/miqgroups/'+node.id+'/users';
                case "project":
                    return path+'/project/'+node.id+'services';
            }
        }
        if(urlHelper.isUsersPath(path)){
            return path+'/'+node.id+'/services';
        }
        if(urlHelper.isServicesPath(path)){
            return path;
        }
    };
    function getTypes(data){
        var types = data.map(function (el) {
            return el.type;
        });
        return Array.from(new Set(types));
    }

}

