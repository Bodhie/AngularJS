
var app = angular.module('movieApp', ['ngRoute', 'ui.bootstrap', 'bootstrapLightbox']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/movie.html",
            controller: 'MovieController',
            activetab: 'home'
        })
        .when("/movie", {
            templateUrl : "views/movie_detail.html",
            controller: 'MovieController',
            activetab: 'movie'
        })
        .when("/actors", {
            templateUrl : "views/actor.html",
            controller: 'ActorController',
            activetab: 'actor'
        })
        .when("/actor", {
            templateUrl : "views/actor_detail.html",
            controller: 'ActorController',
            activetab: 'actor'
        })
        .when("/movies", {
            templateUrl : "views/movie.html",
            controller: 'MovieController',
            activetab: 'movie'
        })
        .when("/login", {
            templateUrl : "views/login.html",
            controller: 'AuthController',
            activetab: 'login'
        })
        .when("/register", {
            templateUrl : "views/register.html",
            controller: 'AuthController',
            activetab: 'login'
        })
        .otherwise({
            // template : "<h1>404</h1><p>Nothing has been selected</p>"
            redirectTo: '/login'
        })
});

app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        $rootScope.tab = current.$$route.activetab;
    });
});

angular.module('movieApp').config(function (LightboxProvider) {
    // set a custom template
    LightboxProvider.templateUrl = 'views/lightbox-modal.html';

    // increase the maximum display height of the image
    LightboxProvider.calculateImageDimensionLimits = function (dimensions) {
        return {
            'maxWidth': dimensions.windowWidth >= 768 ? // default
            dimensions.windowWidth - 92 :
            dimensions.windowWidth - 52,
            'maxHeight': 1600                           // custom
        };
    };

    // the modal height calculation has to be changed since our custom template is
    // taller than the default template
    LightboxProvider.calculateModalDimensions = function (dimensions) {
        var width = Math.max(400, dimensions.imageDisplayWidth + 32);

        if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
            width = 'auto';
        }

        return {
            'width': width,                             // default
            'height': 'auto'                            // custom
        };
    };
});