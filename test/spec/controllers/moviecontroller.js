describe('Controller: MovieController', function () {

    beforeEach(module('movieApp'));

    var Ctrl,scope;
    beforeEach(inject(
        function ($controller, $rootScope) {
            scope = $rootScope.$new();
            Ctrl = $controller('MovieController', {
                $scope: scope
            });
        })
    );

    it('should instantiate the controller properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('it should fill the movieList', function () {
        // scope.init();
        // scope.$digest();
        //
        // expect(scope.movieList.lenght).toBeGreaterThan(0);
    });
});