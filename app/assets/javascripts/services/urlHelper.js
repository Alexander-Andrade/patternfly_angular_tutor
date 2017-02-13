services = angular.module('services');

services.service('urlHelper', urlHelper);
urlHelper.$inject = ['$location'];
function urlHelper($location) {
    var self = this;
    return {
        getBaseUrl: function () {
            var absUrl = $location.absUrl();
            return absUrl.split('#')[0] + '#!';
        },
        accountPath: function () {
            return this.getBaseUrl() + '\/myaccount';
        },
        locationsPath: function () {
            return this.accountPath()+'\/locations';
        },
        locationRegStr: function () {
            return this.locationsPath()+"\/([0-9])+";
        },
        tenantRegStr: function () {
            return this.locationRegStr()+"(\/tenants\/([0-9])+)*";
        },
        miqGroupRegStr: function () {
            return this.tenantRegStr()+"\/miqgroups"+"\/([0-9])+";
        },
        projectRegStr: function () {
            return this.tenantRegStr()+"\/projects"+"\/([0-9])+";
        },
        usersRegStr: function(){
            return this.miqGroupRegStr()+"\/users";
        },
        isAccountPath: function (path) {
            return this.accountPath() == path;
        },
        isLocationsPath: function(path){
            return this.locationsPath() == path;
        },
        isLocationPath: function (path) {
            var re = new RegExp("^"+this.locationRegStr()+"$");
            return re.test(path);
        },
        isTenantPath: function(path){
            var re = new RegExp("^"+this.tenantRegStr()+"$");
            return re.test(path)
        },
        isMiqGroupPath: function(path){
            var re = new RegExp("^"+this.miqGroupRegStr()+"$");
            return re.test(path)
        },
        isProjectPath: function(path){
            var re = new RegExp("^"+this.projectRegStr()+"$");
            return re.test(path)
        },
        isUsersPath: function (path) {
            var re = new RegExp("^"+this.usersRegStr()+"$");
            return re.test(path)
        },
        isServicesPath: function (path) {
            var viaProjectPath = new RegExp("^"+this.projectRegStr()+"\/services"+"$");
            var viaUsersPath = new RegExp("^"+this.usersRegStr()+"\/([0-9])+"+"\/services"+"$");
            return viaProjectPath.test(path) || viaUsersPath.test(path);
        },
        isServicesViaProjectPath: function (path) {
            var viaProjectPath = new RegExp("^"+this.projectRegStr()+"\/services"+"$");
            return viaProjectPath.test(path)
        },
        isServicesViaUsersPath: function (path) {
            var viaUsersPath = new RegExp("^"+this.usersRegStr()+"\/([0-9])+"+"\/services"+"$");
            return viaUsersPath.test(path)
        },
        isCorrectPath: function (path) {
            return  this.isAccountPath(path) || this.isLocationsPath(path) || this.isLocationPath(path) || this.isTenantPath(path) ||
                this.isUsersPath(path) || this.isServicesPath(path);
        },
        cutUptoAccountPath: function (path) {
            var re = new RegExp(this.accountPath());
            return re.match(path);
        },
        cutUptoLocationsPath: function (path) {
            var re = new RegExp(this.locationsPath());
            return re.match(path);
        },
        cutUptoLocationPath: function (path) {
            var re = new RegExp(this.locationRegStr());
            return re.match(path);
        },
        cutUptoUsersPath: function (path) {
            var re = new RegExp(this.usersRegStr());
            return re.match(path);
        },
        cutUptoTenantPath: function (path) {
            if(this.isTenantPath(path)){
                var re = /\/tenants\/([0-9])$/;
                return path.replace(re,'');
            }else{
                var re = new RegExp(this.tenantRegStr());
                return re.match(path);
            }
        },
        nextUrl: function (node) {
            var path = $location.absUrl();

            if(self.isAccountPath(path)){
                return urlHelper.locationsPath();
            }
            if(self.isLocationsPath(path)){
                return ( typeof node.children != 'undefined' && node.children instanceof Array ) ? path+'/'+node.id : path;
            }
            if(self.isLocationPath(path) || self.isTenantPath(path)){
                if(typeof node.children != 'undefined' && node.children instanceof Array) {
                    switch (node.type.toLowerCase()) {
                        case "tenant":
                            return path + '/tenants/' + node.id;
                        case "miqgroup":
                            return path + '/miqgroups/' + node.id + '/users';
                        case "project":
                            return path + '/projects/' + node.id + '/services';
                    }
                }
                else{ return path;}
            }
            if(self.isUsersPath(path)){
                return ( typeof node.children != 'undefined' && node.children instanceof Array ) ? path+'/'+node.id+'/services' : path;
            }
            if(self.isServicesPath(path)){
                return path;
            }
        },
        breadcrumbList: function(node){
            var path = $location.absUrl();
            var list = [];
            var nodeIter = node;

            while(true) {
                if(this.isAccountPath(path)){
                    list.push({url: path, name: nodeIter.name});
                    break;
                }
                else if (this.isLocationsPath(path)) {
                    list.push({url: path, name: nodeIter.name});
                }
                else if (this.isLocationPath(path)) {
                    list.push({url: this.accountPath(), name: node.parent.parent.name});
                    list.push({url: this.locationsPath(), name: node.parent.name});
                }
                else if (this.isTenantPath(path)) {

                }
            }
            return list;
        }
    }
}