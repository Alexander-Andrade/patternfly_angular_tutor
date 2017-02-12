services = angular.module('services');

services.service('nodesHelper', nodesHelper);
nodesHelper.$inject = ['$stateParams'];
function nodesHelper ($stateParams) {

    this.findDataByPath = function(rootNode){
        var paramArgs = $stateParams.path.split('/').slice(1);

        var node = rootNode;
        var children = [rootNode];

        var len = paramArgs.length;
        for(var i=0; i<len; i++){
            //if number
            if(!isNaN(paramArgs[i])){
                node = children.find(function(elem, ind, arr) {
                    return elem.id==(+paramArgs[i]);
                });
                children = node.children;
            }
            else{
                children = node.children.filter(function (child) {
                    return paramArgs[i].startsWith(child.type.toLowerCase());
                });
            }
        }
        return children;
    };
}