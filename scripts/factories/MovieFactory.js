app.factory('MovieFactory', function($http) {
    return {
        getAllMovies: function (user_id, callback) {
            $http.get("https://stefanbode.nl/AngularJS/database/selectMovie.php", {params:{'user_id': user_id}}).then(function(response) {
                callback(response.data);
            });
        },
        getMovieById: function (movie_id, callback) {
            $http.get("https://stefanbode.nl/AngularJS/database/selectMovie.php", {params:{'movie_id': movie_id}}).then(function(response) {
                callback(response.data);
            });
        },
        getActorsOfMovie: function (movie_id, callback) {
            $http.get("https://stefanbode.nl/AngularJS/database/selectMovie.php", {params:{'movie_id_for_actor': movie_id}}).then(function(response) {
                callback(response.data);
            });
        }
    }
});