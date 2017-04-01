app.filter('emptyImage', function () {
    return function (item) {
        if(item == "" || item == "N/A"){
            return "img/noimage.png";
        } else if(item.indexOf("http") != 0){
            item = "https://stefanbode.nl/AngularJS/" + item;
        }
        return item;
    };
});