app.controller('MainController', function($scope, $rootScope, $http, $window, Auth) {
    $scope.credentials = {};
    $scope.loginForm = {};
    $scope.alerts = [];

    $scope.submit = function() {
        $scope.submitted = true;
        if (!$scope.loginForm.$invalid) {
            $scope.login($scope.credentials);
        } else {
            return;
        }
    };

    $scope.login = function(credentials) {
        $scope.error = false;
        Auth.login(credentials, function(user) {
            $window.location.href = '#!/';
        }, function(err) {
            console.log("error");
        });
    };


    $rootScope.logout = function(){
        Auth.logout();
        $window.location.reload();
    };

    if ($window.sessionStorage["userInfo"]) {
        var credentials = JSON.parse($window.sessionStorage["userInfo"]);
        Auth.login(credentials, function(user) {
            $window.location.href = '#!/';
        }, function(err) {
            console.log("error");
        });
    }
});