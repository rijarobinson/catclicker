
var model = {

    addKitties:function(kittyList) {
        var theCats = {
        selectedCat: null,
        kitties: kittyList
    };
        console.log("theCats: " + JSON.stringify(theCats));
        octopus.viewList(theCats);
    }
};


var octopus = {
    init:function()
    {
        view.getKitties();
    },

    addKitties:function(kittyList) {
        model.addKitties(kittyList);
    },

    getSelectedCat:function() {
        return model.selectedCat;
    },

    viewList:function(theCats) {
        console.log("reached octopus.viewList");
        console.log("theCats: " + JSON.stringify(theCats));
        console.log("kitties: " + JSON.stringify(theCats.kitties[0]["catName"]));
        viewList.render(theCats);
    },

    setSelectedCat:function(kittyCopy) {
/*        console.log("selectedCat passed to octopus.setSelectedCat: " + JSON.stringify(kittyCopy));*/
        model.selectedCat = kittyCopy;
/*        console.log("selectedCat in dictionary: " + JSON.stringify(model.selectedCat));*/
    },

    addClick:function() {
        model.selectedCat.catClicks++;
        showSingleCat.render();
    }
};

var view = {
    getKitties:function() {
        var howManyKitties = prompt("How many kitties do you want to see?", "2");
        var numberOfKitties = parseInt(howManyKitties);
        var kittyList = []
        if (numberOfKitties > 0) {
            for (var i = 0; i < numberOfKitties; i++)
            {
                var catClicks = 0;
                var catName = prompt("What's the name of kitty number " + (i + 1) + "?");
                var catImage = prompt("What's the URL for " + catName +"'s image?", "http://www.placekitten.com/600/300");
                kittyList.push({catName, catImage, catClicks});
            }
        octopus.addKitties(kittyList);
        }
    }
};

var viewList = {
        render: function(theCats) {
            for (var i = 0; i < theCats.kitties.length; i++) {
                kitty = theCats.kitties[i];
                console.log("catName: " + theCats.kitties[i]["catName"]);
                var h2 = document.createElement("h2");
                h2.id = "cat-name" + i;
                document.getElementById("kitkat").appendChild(h2);
                $(h2).text(theCats.kitties[i]["catName"]);

                $('#cat-name' + i).click(function(kittyCopy) {
                    return function() {
                        console.log("selectedCat when clicked: " + JSON.stringify(kittyCopy));
                        octopus.setSelectedCat(kittyCopy);
                        console.log("selectedCat after octopus.setSelectedCat: " + JSON.stringify(model.selectedCat));
                        showSingleCat.render();
                };
                }(kitty));
            }
        },
};

var showSingleCat = {
    render:function() {
        var selectedCat = octopus.getSelectedCat();
/*        console.log("selectedCat: " + JSON.stringify(selectedCat));*/
        if ($('#selected-cat').children().length > 0) {
            var source = selectedCat[1];
            $('#cat-pic-feat').children().attr("src", source);

            var selectedCatName = selectedCat[0];
            $('#cat-name-feat').text(selectedCatName);

            var selectedCatClicks = selectedCat[2];
            $('#cat-clicks-feat').text(selectedCatClicks);
        }
        else {
            var div5 = document.createElement("div");
            div5.id = "cat-name-feat";
            document.getElementById("selected-cat").appendChild(div5);
            var selectedCatName = selectedCat[0];
            $('#cat-name-feat').text(selectedCatName);

            var div4 = document.createElement("div");
            div4.id = "cat-pic-feat";
            document.getElementById("selected-cat").appendChild(div4);
            var img = document.createElement("img");
            img.src = selectedCat[1];
            document.getElementById("cat-pic-feat").appendChild(img);

            var div6 = document.createElement("div");
            div6.id = "cat-clicks-feat";
            document.getElementById("selected-cat").appendChild(div6);
            $('#cat-clicks-feat').text(selectedCatClicks);

            $('#cat-pic-feat').click(function() {
                octopus.addClick();

            });

        }
    }


};

octopus.init();