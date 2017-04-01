app.factory('Auth', function($http, $rootScope, $window, Session, AUTH_EVENTS) {
    var authService = {};

    //the login function
    authService.login = function(user, success, error) {
        $http.post('https://stefanbode.nl/AngularJS/database/selectUsers.php', {'username' : user.username, 'password' : user.password}).then(function(data) {
            //this is my dummy technique, normally here the
            //user is returned with his data from the db
            var loginData = data.data[0];
            if (loginData) {
                //set the browser session, to avoid relogin on refresh
                loginData.password = user.password;
                $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                //delete password not to be seen clientside
                delete loginData.password;

                //update current user into the Session service or $rootScope.currentUser
                //whatever you prefer
                Session.create(loginData);
                //or
                $rootScope.currentUser = loginData;

                //fire event of successful login
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                //run success function
                success(loginData);
            } else {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                error();

                console.log('Gebruikersnaam of wachtwoord verkeerd.');
                //$scope.alerts.push({msg: "Gebruikersnaam of wachtwoord verkeerd."});
            }
        },function (error){
            console.log(error);
        });
    };

    //check if the user is authenticated
    authService.isAuthenticated = function() {
        return !!Session.user;
    };

    //check if the user is authorized to access the next route
    //this function can be also used on element level
    //e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
    authService.isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    //log out the user and broadcast the logoutSuccess event
    authService.logout = function(){
        Session.destroy();
        $window.sessionStorage.removeItem("userInfo");
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    return authService;
});