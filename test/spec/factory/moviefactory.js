describe('Controller: MovieFactory', function () {
    var MovieFactory;

    beforeEach(function() {
        module('movieApp');
        var $injector = angular.injector(['movieApp']);
        MovieFactory = $injector.get('MovieFactory');
    });

    it('should get all movies', function () {
        var movieList;
            // Init the scope.movieList
        movieList = MovieFactory.getAllMovies(0, function (movies) {
            movieList = movies;
            expect(movieList.length).toBeGreaterThan(0);
        });

        // spyOn(MovieFactory, 'getAllMovies');
        //
        // expect(movieList.lenght).toBeGreaterThan(0);
    });

    it('should get the first movie of user 0', function () {
        var movieList;
        // Init the scope.movieList
        MovieFactory.getAllMovies(0, function (movies) {
            movieList = movies;
            expect(movieList[0].name).toBe("Finding Dasasorys");
        });
    });
});