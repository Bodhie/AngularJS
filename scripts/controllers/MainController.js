app.controller('MainController', function($scope, $rootScope, $http, $window, Auth) {
    $scope.credentials = {};
    $scope.loginForm = {};
    $scope.alerts = [];

    //when the form is submitted
    $scope.submit = function() {
        $scope.submitted = true;
        if (!$scope.loginForm.$invalid) {
            $scope.login($scope.credentials);
        } else {
            return;
        }
    };

    //Performs the login function, by sending a request to the server with the Auth service
    $scope.login = function(credentials) {
        console.log('LOGIN!');
        $scope.error = false;
        Auth.login(credentials, function(user) {
            //success function
            $window.location.href = '#!/';
        }, function(err) {
            console.log("error");
        });
    };


    $rootScope.logout = function(){
        console.log('loguit!');
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