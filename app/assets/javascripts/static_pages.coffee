resourceApp = angular.module('resource', ['patternfly.charts','patternfly.card']);

resourceApp.controller('ResourceCtrl', ['$scope',($scope) ->
    $scope.svm_reserved_perc = 80;
    $scope.svm_used_perc = 30;
    $scope.svm_reserved = 200;
    $scope.svm_total = 230;

    $scope.storage_reserved_perc = 90;
    $scope.storage_used_perc = 60;
    $scope.storage_reserved = 10;
    $scope.storage_total = 15;

    $scope.hours_reserved_perc = 100;
    $scope.hours_used_perc = 30;
    $scope.hours_reserved = 40;
    $scope.hours_total = 50;

    $scope.svmBarClicked = ->
      alert 'svm bar clicked'

    setTimeout ( ->
      $scope.$apply(->
        $scope.svm_reserved = 150
      )
    ), 1000

    setTimeout ( ->
      $scope.$apply(->
        $scope.storage_used_perc = 5
      )
    ), 2000

    setTimeout ( ->
      $scope.$apply(->
        $scope.hours_reserved_perc = 90;
        $scope.hours_used_perc = 50;
        $scope.hours_reserved = 45;
        $scope.hours_total = 60;
      )
    ), 3000

    setTimeout ( ->
      $scope.$apply(->
        $scope.svm_reserved_perc = 80;
        $scope.svm_used_perc = 90;
      )
    ), 4000
]);

$ ->
  $('[data-toggle="tooltip"]').tooltip()
