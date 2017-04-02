
describe('Controller : ActorController', function(){
    var $rootScope, $scope, $controller, serviceResponse, $httpBackend;

    serviceResponse = [{id: 1, name: 'Johnney Depp'}, {id: 2, name : "Eddy Morphy"}];

    beforeEach(function () {
        module('movieApp');
    });

    beforeEach(function () {
        inject(function (_$controller_,_$rootScope_,_$httpBackend_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;

            $rootScope.$digest();

            $scope = $rootScope.$new(); $controller('ActorController', {'$rootScope': $rootScope, '$scope': $scope });
        });
    });

    it('Get all actor from mock', function() {
        $httpBackend.expectGET("https://stefanbode.nl/AngularJS/database/selectActor.php").respond(serviceResponse);
        $scope.init();
        $httpBackend.flush();// will make sure above ajax code has received response
        expect($scope.actorList).toEqual(serviceResponse);
    });
});