services = angular.module('services');

services.service('urlHelper', urlHelper);
urlHelper.$inject = ['$location'];
function urlHelper($location) {
    var self = this;
    self.numRegStr = "\/([0-9])+";
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
        }
    }
}