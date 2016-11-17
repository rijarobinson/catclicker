$(function(){

    var model = {

        init: function() {
            if (!kitties) {
                var kitties = [];
                var numberOfKitties = 0;
            }
            octopus.createKittyList(kitties, numberOfKitties);
        },

        add: function(obj) {
            var data = [];
            for (var i in obj)
            {
                data.push({
                "catName": obj[i][0],
                "catImage": obj[i][1],
            });
            var catJSON = data;
            }
            octopus.showKittyList(catJSON);
        },

        clickCat: function(elementNo, catJSON) {
            var selectedCat = [];
            var catNo = elementNo - 1;
            selectedCat.push(catJSON[catNo]["catName"]);
            selectedCat.push(catJSON[catNo]["catImage"]);
            octopus.giveSelectedCat(selectedCat, elementNo);
        }

    };

    var octopus = {

        init: function() {
            model.init();
        },

        createKittyList: function(kitties, numberOfKitties) {
            viewList.createKittyList(kitties, numberOfKitties);
        },

        getKittyList: function(kitties) {
            model.add(kitties);
        },

        showKittyList: function(catJSON) {
            viewList.render(catJSON);
        },

        nameClick: function(elementNo, catJSON) {
            $('#cat-name' + elementNo).click(function() {
                model.clickCat(elementNo, catJSON);
            })
        },

        giveSelectedCat: function(selectedCat, elementNo) {
                viewSingleCat.showDetail(selectedCat, elementNo);
        }

    };

    var viewList = {

        createKittyList: function(kitties, numberOfKitties) {
            var elementNo = 0;
            var catName, catImage;
            var howManyKitties = prompt("How many kitties do you want to see?", "2");
            numberOfKitties = parseInt(howManyKitties);
            if (numberOfKitties > 0) {
                for (i = 0; i < numberOfKitties; i++)
                {
                    elementNo = i + 1;
                    catName = prompt("What's the name of kitty number " + elementNo + "?");
                    catImage = prompt("What's the URL for " + catName +"'s image?", "http://www.placekitten.com/600/300");
                    kitties.push([catName, catImage]);
                }
            }
            octopus.getKittyList(kitties);
        },

        render: function(catJSON) {
            for (var i = 0; i < catJSON.length; i++) {
                elementNo = i + 1;
                var h2 = document.createElement("h2");
                h2.id = "cat-name" + elementNo;
                document.getElementById("kitkat").appendChild(h2);
                $(h2).text(catJSON[i]["catName"]);

                var div3 = document.createElement("div");
                div3.id = "number-clicks" + elementNo;
                div3.style = "visibility: hidden;";
                $(div3).text(0);
                document.getElementById("kitkat").appendChild(div3);

                octopus.nameClick(elementNo, catJSON);
            }
        }
    };

    var viewSingleCat = {
        showDetail: function(selectedCat, elementNo) {
            var currentClicks = parseInt($('#number-clicks' + elementNo).text());
            $('#number-clicks' + elementNo).text(currentClicks + 1);
            if ($('#selected-cat').children().length > 0) {
                var source = selectedCat[1];
                $('#cat-pic-feat').children().attr("src", source);

                var selectedCatName = selectedCat[0];
                $('#cat-name-feat').text(selectedCatName);

                var selectedCatClicks = $('#number-clicks' + elementNo).text();
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
                var selectedCatClicks = $('#number-clicks' + elementNo).text();
                $('#cat-clicks-feat').text(selectedCatClicks);
            }
        }
    };

    octopus.init();

});