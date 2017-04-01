describe("Filter: emptyFilter", function() {

    var filter;

    beforeEach(function() {
        module("movieApp");

        inject(function($filter) {
            filter = $filter('emptyImage');
        });
    });

    it("should display image not found", function() {
        var input = ""; //13 chars
        var output = "img/noimage.png";

        expect(filter(input)).toBe(output);
    });

    it("should display image not found for image N/A", function() {
        var input = "N/A"; //13 chars
        var output = "img/noimage.png";

        expect(filter(input)).toBe(output);
    });

    it("should return the string of image", function() {
        var input = "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4MjU3MDIzOF5BMl5BanBnXkFtZTgwMjM2MzY2MDI@._V1_SX300.jpg"; //20 chars
        var output = "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4MjU3MDIzOF5BMl5BanBnXkFtZTgwMjM2MzY2MDI@._V1_SX300.jpg";

        expect(filter(input)).toBe(output);
    });
});