describe("Filter: genderFilter", function() {

    var filter;

    beforeEach(function() {
        module("movieApp");

        inject(function($filter) {
            filter = $filter('genderFilter');
        });
    });

    it("should display female image icon", function() {
        var input = "Anna Bold"; // Female name
        var output = "img/female.png";

        expect(filter(input)).toBe(output);
    });

    it("should display male image icon", function() {
        var input = "Eddie Murphy"; // Male name
        var output = "img/male.png";

        expect(filter(input)).toBe(output);
    });

    it("should display male and female icon", function() {
        var input = "Martijn Fischer"; //Not know gender name
        var output = "img/gender_unknown.png";

        expect(filter(input)).toBe(output);
    });
});