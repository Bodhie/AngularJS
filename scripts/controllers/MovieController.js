app.controller("MovieController", function($scope,$rootScope,$route,Lightbox,$http,$routeParams,MovieFactory) {
    $scope.Lightbox = Lightbox;
    $scope.alerts = [];
    $scope.movieList = [];
    $scope.btnName = "Insert";
    $scope.collapsed = false;
    var user_id;

    // SELECT MOVIES
    $scope.init = function() {
        user_id = (angular.isUndefined($rootScope.currentUser)) ? 0 : $rootScope.currentUser.id;

        MovieFactory.getAllMovies(user_id, function (movies) {
            $scope.movieList = movies;
        });
    }

    $scope.initMovie = function(){
        MovieFactory.getMovieById($routeParams.movie_id, function (movie) {
            $scope.movie = movie;
        });
    }

    $scope.initActorsOfUser = function() {
        MovieFactory.getActorsOfMovie($routeParams.movie_id, function (actors) {
            $scope.actorList = actors;
        });
    }

    $scope.setCollapsedTrue = function(){
        $scope.collapsed = true;
    }

    $scope.toggleCollapsed = function(){
        $scope.btnName = "Insert";
        $scope.movieName = "";
        $scope.movieCaption = "";

        $scope.collapsed=!$scope.collapsed;
    }

    // INSERT MOVIES
    $scope.submit = function () {
        $scope.loading = true;
        $scope.error = false;
        $http.get('https://www.omdbapi.com/?t=' + $scope.search + '&y=&plot=full&r=json')
            .then(function (success){
                var movie = success.data;

                if(movie.Response != "False") {
                    $http.post("https://stefanbode.nl/AngularJS/database/insertMovie.php", {'name': movie.Title, 'caption': movie.Plot, 'url': movie.Poster, 'btnName': 'Insert','user_id': user_id}).then(function (success) {
                        var actors = movie.Actors.split(', ');
                        var x = 0;
                        var loopArray = function(arr) {
                            $http.post("database/insertActor.php", {
                                'movie_id': success.data,
                                'actor_name': arr[x]
                            }).then(function (success) {
                                $scope.alerts.push({msg: "Actor " + arr[x] + " added"});
                                x++;
                                if(x < arr.length) {
                                    loopArray(arr);
                                }
                            })
                        }
                        loopArray(actors);

                        $scope.alerts.push({msg: "Movie added"});
                        $scope.init();
                    })
                } else {
                    $scope.alerts.push({msg: "Movie not found"});
                }
            },function (error){
                console.log(error);
            });
    };

    // ADD MOVIES
    $scope.addMovie = function() {
        var file = document.getElementById('file').files[0];

        var data = new FormData();
        data.append('file', document.getElementById('file').files[0]);
        $http({
            url: "upload.php",
            method: "POST",
            data: data,
            headers: {'Content-Type': undefined}
        }).then(function (response) {
            $http.post("https://stefanbode.nl/AngularJS/database/insertMovie.php", {'id': $scope.id,'name': $scope.movieName,'caption': $scope.movieCaption,'url': JSON.parse(response.data),'btnName': $scope.btnName,'user_id': user_id})
                .then(function () {
                    $scope.alerts.push({msg: "Movie added"});
                    $scope.movieName = "";
                    $scope.movieCaption = "";
                    document.getElementById("file").value = "";
                    $scope.init();
                })
        });
    }

    // DELETE MOVIES
    $scope.deleteMovie = function(movie){
        $http.post("https://stefanbode.nl/AngularJS/database/deleteMovie.php",{'id':movie.id,'user_id': user_id})
            .then(function(){
                $scope.alerts.push({msg: "Movie deleted"});
                $scope.init();
            })
    }

    // EDIT MOVIES
    $scope.editMovie = function(movie) {
        $scope.id               = movie.id;
        $scope.movieName        = movie.name;
        $scope.movieCaption     = movie.caption;
        $scope.movieUrl         = movie.url;
        $scope.btnName          = "Update";
        $scope.init();
    }

    // SET SEEN
    $scope.setMovieSeen = function(movie) {
        var seen = (movie.seen == true) ? 0 : 1;
        $http.post("https://stefanbode.nl/AngularJS/database/insertMovie.php",{'id': movie.id, 'seen': seen,'btnName':"setSeen",'user_id': user_id})
            .then(function(){
                $scope.alerts.push({msg: (movie.seen == true) ? "Shown removed" : "Movie add to shown"});
                $scope.init();
            })
    }

    $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.movieList, index);
    };

    // CLOSE ALERTS
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});