
var model = {
    addKitties:function(kittyList) {
        var theCats = {
        selectedCat: null,
        kitties: kittyList
        };
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
        viewList.render(theCats);
    },

    setSelectedCat:function(kittyCopy) {
        model.selectedCat = kittyCopy;
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
                var h2 = document.createElement("h2");
                h2.id = "cat-name" + i;
                document.getElementById("kitkat").appendChild(h2);
                $(h2).text(theCats.kitties[i]["catName"]);

                $('#cat-name' + i).click(function(kittyCopy) {
                    return function() {
                        octopus.setSelectedCat(kittyCopy);
                        showSingleCat.render();
                };
                }(kitty));
            }
        },
};

var showSingleCat = {
    render:function() {
        var selectedCat = octopus.getSelectedCat();
        var selectedCatName = selectedCat.catName;
        var selectedCatClicks = selectedCat.catClicks;
        var source = selectedCat.catImage;

        if ($('#selected-cat').children().length > 0) {

            $('#cat-name-feat').text(selectedCatName);
            $('#cat-clicks-feat').text(selectedCatClicks);
            $('#cat-pic-feat').children().attr("src", source);

        }
        else {

            var nameFeatured = document.createElement("div");
            var picFeatured = document.createElement("div");
            var clicksFeatured = document.createElement("div");
            var selCatImage = document.createElement("img");

            nameFeatured.id = "cat-name-feat";
            picFeatured.id = "cat-pic-feat";
            clicksFeatured.id = "cat-clicks-feat";
            selCatImage.src = source;

            document.getElementById("selected-cat").appendChild(nameFeatured);
            document.getElementById("selected-cat").appendChild(picFeatured);
            document.getElementById("cat-pic-feat").appendChild(selCatImage);
            document.getElementById("selected-cat").appendChild(clicksFeatured);

            $('#cat-name-feat').text(selectedCatName);
            $('#cat-clicks-feat').text(selectedCatClicks);

            $('#admin').css("display","block");

            $('#admin').click(function() {
                var editName = document.createElement("input");
                var editPicURL = document.createElement("input");
                var editCatClicks = document.createElement("input");

                editName.id = "cat-name-edit";
                editPicURL.id =  "cat-pic-edit";
                editCatClicks.id = "cat-clicks-edit";

                document.getElementById("edit-fields").appendChild(editName);
                document.getElementById("edit-fields").appendChild(editPicURL);
                document.getElementById("edit-fields").appendChild(editCatClicks);

                $("#cat-name-edit").attr("value", selectedCat.catName);
                $("#cat-pic-edit").attr("value", selectedCat.catImage);
                $("#cat-clicks-edit").attr("value", selectedCat.catClicks);

            });

            $('#cat-pic-feat').click(function() {
                octopus.addClick();
            });
        }
    }
};

octopus.init();