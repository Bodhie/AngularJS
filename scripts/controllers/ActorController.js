angular.module('movieApp').controller("ActorController", function($scope,$route,Lightbox,$routeParams,$http) {
    $scope.actorList = [];

    // SELECT ACTORS
    $scope.init = function() {
        $http.get("https://stefanbode.nl/AngularJS/database/selectActor.php")
        .then(function(data){
            $scope.actorList = data.data;
        })
    }

    $scope.initActor = function() {
        $http.get("https://stefanbode.nl/AngularJS/database/selectActor.php", {params:{'actor_id': $routeParams.actor_id}})
        .then(function(response) {
            $scope.actor = response.data;
        });
    }
});