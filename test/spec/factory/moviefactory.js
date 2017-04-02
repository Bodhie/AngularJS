describe('Controller: MovieFactory', function () {
    var MovieFactory;

    var mockAuthData = [{id: 1, name : "Finding Dory"}, {id: 2, name: "Finding Nemo"}];

    beforeEach(function() {
        module('movieApp');
        // var $injector = angular.injector(['movieApp']);
        // MovieFactory = $injector.get('MovieFactory')

        module(function($provide) {
            // Fake AuthService Implementation returning a promise
            $provide.value('MovieFactory', {
                login:function(){
                    return{
                        then:function(callback){return callback(mockAuthData);}
                    };
                }
            });
            return null;
        });

        var $injector = angular.injector(['movieApp']);
        MovieFactory = $injector.get('MovieFactory')
    });
});