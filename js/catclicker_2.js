
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
    },

    updateCat:function(updateCatName,updateCatPic,updateCatClicks,catId,theCats) {

        console.log("theSelectedCat in updateCat function: " + JSON.stringify(model.selectedCat));

        model.selectedCat.catName = updateCatName;
        model.selectedCat.catImage = updateCatPic;
        model.selectedCat.catClicks = updateCatClicks;

        viewList.render(theCats);
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
                var catId = i;
                var catClicks = 0;
                var catName = prompt("What's the name of kitty number " + (i + 1) + "?");
                var catImage = prompt("What's the URL for " + catName +"'s image?", "http://www.placekitten.com/600/300");
                kittyList.push({catName, catImage, catClicks, catId});
            }
        octopus.addKitties(kittyList);
        }
    }
};

var viewList = {
        render: function(theCats) {
            if ($("#kitkat").children().length > 0) {
                $("#kitkat").children().remove();
            }
            for (var i = 0; i < theCats.kitties.length; i++) {
                kitty = theCats.kitties[i];
                var h2 = document.createElement("h2");
                h2.id = "cat-name" + i;
                document.getElementById("kitkat").appendChild(h2);
                $(h2).text(theCats.kitties[i]["catName"]);

                $('#cat-name' + i).click(function(kittyCopy) {
                    return function() {
                        if ($('#edit-fields').children().length > 0) {
                            $("#edit-fields").children().remove();
                            $('#save').css("display", "none");
                            $('#cancel').css("display", "none");
                            $('#hide').css("display", "none");
                        }
                        octopus.setSelectedCat(kittyCopy);
                        console.log("kittyCopy being passed: " + JSON.stringify(kittyCopy));
                        showSingleCat.render(theCats);
                };
                }(kitty));
            }
        },
};

var showSingleCat = {
    render:function(theCats) {
        var selectedCat = octopus.getSelectedCat();
        console.log("selectedCat when showSingleCat inititates: " + JSON.stringify(selectedCat));
        var selectedCatName = selectedCat.catName;
        var selectedCatClicks = selectedCat.catClicks;
        var source = selectedCat.catImage;
        var catId = selectedCat.catId;
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

            $('#admin').css("display", "inline");

            $('#cat-pic-feat').click(function() {
                octopus.addClick();
            });

            $('#admin').click(function() {
                var thisCat = octopus.getSelectedCat();
                console.log("selectedCat after click: " + JSON.stringify(thisCat));
                var editName = document.createElement("input");
                var editPicURL = document.createElement("input");
                var editCatClicks = document.createElement("input");

                editName.id = "cat-name-edit";
                editPicURL.id =  "cat-pic-edit";
                editCatClicks.id = "cat-clicks-edit";

                document.getElementById("edit-fields").appendChild(editName);
                document.getElementById("edit-fields").appendChild(editPicURL);
                document.getElementById("edit-fields").appendChild(editCatClicks);

                $("#cat-name-edit").attr("value", thisCat.catName);
                $("#cat-pic-edit").attr("value", thisCat.catImage);
                $("#cat-clicks-edit").attr("value", thisCat.catClicks);

                $('#save').css("display", "inline");
                $('#cancel').css("display", "inline");
                $('#hide').css("display", "inline");

                $("#cat-name-edit").css("display", "block");
                $("#cat-pic-edit").css("display", "block");
                $("#cat-clicks-edit").css("display", "block");

                });

             $('#save').click(function() {
                console.log("updateCatName: " + $("#cat-name-edit").val());
                var updateCatName = $("#cat-name-edit").val();
                var updateCatPic = $("#cat-pic-edit").val();
                var updateCatClicks = $("#cat-clicks-edit").val();

                $("#cat-name-edit").remove();
                $("#cat-pic-edit").remove();
                $("#cat-clicks-edit").remove();
                $('#save').css("display", "none");
                $('#cancel').css("display", "none");
                $('#hide').css("display", "none");

                octopus.updateCat(updateCatName,updateCatPic,updateCatClicks,catId,theCats);
});

                $('#cancel').click(function() {
                $("#cat-name-edit").val(selectedCat.catName);
                $("#cat-pic-edit").val(selectedCat.catImage);
                $("#cat-clicks-edit").val(selectedCat.catClicks);

            });

            $('#hide').click(function() {
                $("#cat-name-edit").remove();
                $("#cat-pic-edit").remove();
                $("#cat-clicks-edit").remove();
                $('#save').css("display", "none");
                $('#cancel').css("display", "none");
                $('#hide').css("display", "none");

            });


        }
        console.log("selectedCat after page layout: " + JSON.stringify(selectedCat));
    }
};

octopus.init();