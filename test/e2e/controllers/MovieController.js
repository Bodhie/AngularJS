describe('E2E: AboutController', function() {

    beforeEach(function() {
        browser.get('http://localhost:8080/#!/movies');
    });
    
    it('should active the right nav', function() {
        element(by.className('movie')).click();

        var active = element(by.className('active'));
        var activeText = active.getText();
        expect(activeText).toBe("Movies");
    });

    it('It should be redirected to actor page', function() {
        element(by.className('actor')).click();

        var active = element(by.className('active'));
        var activeText = active.getText();
        expect(activeText).toBe("Actors");
    });

});