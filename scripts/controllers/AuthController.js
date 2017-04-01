app.controller('AuthController', function($scope, $http, $window, Auth) {
    $scope.credentials = {};
    $scope.loginForm = {};
    $scope.error = false;
    $scope.alerts = [];

    //when the form is submitted
    $scope.submit = function() {
        $scope.submitted = true;
        if (!$scope.loginForm.$invalid) {
            $scope.login($scope.credentials);
        } else {
            $scope.error = true;
            return;
        }
    };

    //Performs the login function, by sending a request to the server with the Auth service
    $scope.login = function(credentials) {
        $scope.error = false;
        Auth.login(credentials, function(user) {
            //success function
            $window.location.href = '#!/';
        }, function(err) {
            console.log("error");
            $scope.error = true;
        });
    };

    $scope.register = function(){
        $http.post("https://stefanbode.nl/AngularJS/database/insertUser.php", {'username': $scope.username, 'password': $scope.password, 'email': $scope.email}).then(function (success) {
            $scope.alerts.push({msg: "User added"});
        })
    }
});

app.constant('USER_ROLES', {
    all : '*',
    admin : 'admin',
    editor : 'editor',
    guest : 'guest'
}).constant('AUTH_EVENTS', {
    loginSuccess : 'auth-login-success',
    loginFailed : 'auth-login-failed',
    logoutSuccess : 'auth-logout-success',
    sessionTimeout : 'auth-session-timeout',
    notAuthenticated : 'auth-not-authenticated',
    notAuthorized : 'auth-not-authorized'
})