
var model = {
    init: function() {
        var kitties = [];
        var numberOfKitties = 0;
        var elementNo = 0;
        var catName, catImage;
        numberOfKitties = parseInt(prompt("How many kitties do you want to see?", "2"));
        if (numberOfKitties > 0) {
            for (i = 0; i < numberOfKitties; i++)
            {
                elementNo = i;
                catName = prompt("What's the name of kitty number " + elementNo + "?");
                catImage = prompt("What's the URL for " + catName +"'s image?", "http://www.placekitten.com/600/300");
                kitties.push([catName, catImage]);
                console.log("kitties: " + kitties);
            }
        }
        var data = [];
        for (var i in kitties)
        {
            data.push({
            "catName": kitties[i][0],
            "catImage": kitties[i][1],
            "catClicks": 0
        });
        var catJSON = data;
        console.log("catJSON: " + catJSON);
        }
        octopus.showKittyList(catJSON);
    }
};



var octopus = {
    init: function() {
        model.init();
    },

    showKittyList: function(catJSON) {
        viewList.showKittyList(catJSON)
    },

    showSelectedCat: function(selectedCat) {
        viewSelectedCat.showSelectedCat(selectedCat);
    },

    incrementClicks: function(selectedCat) {
        console.log("catClicks: " + selectedCat.catClicks);
        console.log("selectedCatInIncrementF: " + JSON.stringify(selectedCat));
        selectedCat.catClicks++;
        viewSelectedCat.render(selectedCat);
    }

};

var viewList = {
    showKittyList: function(catJSON) {
    /*create dom elements*/
    for (var i = 0; i < catJSON.length; i++) {
        elementNo = i;
        var h2 = document.createElement("h2");
        h2.id = "cat-name" + elementNo;
        document.getElementById("kitkat").appendChild(h2);
        $(h2).text(catJSON[i]["catName"]);

        $('#cat-name' + elementNo).click(function(numCopy) {
            return function() {
                var selectedCat = catJSON[numCopy];
                console.log("selectedCat: " + JSON.stringify(selectedCat));
                /*send the JSON object of the selected cat*/
                octopus.showSelectedCat(selectedCat);
                };
            }(elementNo));
        }
    }
};

var viewSelectedCat = {
    showSelectedCat: function(selectedCat) {
        console.log(selectedCat["catName"]);
        if ($('#selected-cat').children().length > 0) {

            var source = selectedCat["catImage"];
            $('#cat-pic-feat').children().attr("src", source);

            var selectedCatName = selectedCat["catName"];
            $('#cat-name-feat').text(selectedCatName);

            var selectedCatClicks = selectedCat["catClicks"];
            $('#cat-clicks-feat').text(selectedCatClicks);
        }
        else {
            var div5 = document.createElement("div");
            div5.id = "cat-name-feat";
            document.getElementById("selected-cat").appendChild(div5);
            var selectedCatName = selectedCat["catName"];
            $('#cat-name-feat').text(selectedCatName);

            var div4 = document.createElement("div");
            div4.id = "cat-pic-feat";
            document.getElementById("selected-cat").appendChild(div4);
            var img = document.createElement("img");
            img.src = selectedCat["catImage"];
            document.getElementById("cat-pic-feat").appendChild(img);

            var div6 = document.createElement("div");
            div6.id = "cat-clicks-feat";
            document.getElementById("selected-cat").appendChild(div6);
            var selectedCatClicks = selectedCat["catClicks"];
            $('#cat-clicks-feat').text(selectedCatClicks);
            }
        $('#cat-pic-feat').click(function() {
            octopus.incrementClicks(selectedCat);
            })
    },

    render: function(selectedCat) {
        console.log("selectedCat: " + JSON.stringify(selectedCat));
    }
};

octopus.init();