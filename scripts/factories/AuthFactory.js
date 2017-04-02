app.factory('Auth', function($http, $rootScope, $window, Session, AUTH_EVENTS) {
    var authService = {};

    authService.login = function(user, success, error) {
        $http.post('https://stefanbode.nl/AngularJS/database/selectUsers.php', {'username' : user.username, 'password' : user.password}).then(function(data) {
            var loginData = data.data[0];
            if (loginData) {
                loginData.password = user.password;
                $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                delete loginData.password;

                Session.create(loginData);
                $rootScope.currentUser = loginData;

                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                success(loginData);
            } else {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                error();

                console.log('Gebruikersnaam of wachtwoord verkeerd.');
            }
        },function (error){
            console.log(error);
        });
    };

    authService.isAuthenticated = function() {
        return !!Session.user;
    };

    authService.isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    authService.logout = function(){
        Session.destroy();
        $window.sessionStorage.removeItem("userInfo");
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    return authService;
});