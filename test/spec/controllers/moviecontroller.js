describe('Controller: MovieController', function () {
    var MovieController, scope, _mockMyService, _mockPromise = [{id: 1, name : "Finding Dory"}, {id: 2, name: "Finding Nemo"}];

    beforeEach(module('movieApp'));
    beforeEach(inject(function(_$rootScope_, _$controller_){
        $controller = _$controller_;
        scope = _$rootScope_;

        _mockMyService = {
            getAllMovies: function() {
                return _mockPromise;
            }
        };
    }));

    describe('should load data successfully', function() {
        beforeEach(function() {
            $controller('MovieController', { $scope: scope, MovieFactory: _mockMyService });

            scope.movieList = _mockMyService.getAllMovies();
        });

        it('it should fill the movieList with the mocked data', function () {
            expect(scope.movieList.length).toBeGreaterThan(0);
        });

        it('it should fill the movieList and the first name should be Finding Dory', function () {
            expect(scope.movieList[0].name).toBe("Finding Dory");
            expect(scope.movieList[1].name).toBe("Finding Nemo");
        });

        it('it should fill the movieList and get the id and name of the first object', function () {
            expect(scope.movieList[0].id).toBe(1);
            expect(scope.movieList[0].name).toBe("Finding Dory");
        });
    })
});