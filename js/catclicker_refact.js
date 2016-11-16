$(function(){

    var model = {
        init: function() {
            if (!kitties) {
                var kitties = [];
                var numberOfKitties = 0;
            }
            console.log("Model init executed.")
            octopus.createKittyList(kitties, numberOfKitties);
        },
        add: function(obj) {
            var data = [];
            for (var i in obj)
            {

                data.push({
                "catName": obj[i][0],
                "catImage": obj[i][1],
                "catClicks": 0
            });
            var catJSON = data;
            console.log("record being logged: " + catJSON);
            }
            octopus.showKittyList(catJSON);
        },

        clickCat: function(elementNo, catJSON) {
                    $('#cat-name' + elementNo).click((function(numCopy)
            {
            return function() {
                var currentClicks = parseInt($('#number-clicks' + numCopy).text());
                $('#number-clicks' + numCopy).text(currentClicks + 1);
/* tried to add something :), but needs work */

                if ($('#selected-cat').children().length > 0)
                {
                    var source = $('#cat-pic' + numCopy).children().attr("src");
                    $('#cat-pic-feat').children().attr("src", source);

                    var selectedCatName = $('#cat-name' + numCopy).text();
                    $('#cat-name-feat').text(selectedCatName);

                    var selectedCatClicks = $('#number-clicks' + numCopy).text();
                    $('#cat-clicks-feat').text(selectedCatClicks);

                }
                else
                {

                    var div5 = document.createElement("div");
                    div5.id = "cat-name-feat";
                    /*create the div to hold the cat's name*/
                    document.getElementById("selected-cat").appendChild(div5);
                    /*get the text from the selected cat's name */
                    var selectedCatName = $('#cat-name' + numCopy).text();
                    $('#cat-name-feat').text(selectedCatName);



                    var div4 = document.createElement("div");
                    div4.id = "cat-pic-feat";
                    document.getElementById("selected-cat").appendChild(div4);

                    var img = document.createElement("img");
                    img.src = $('#cat-pic' + numCopy).children().attr("src");
                    document.getElementById("cat-pic-feat").appendChild(img);


                    var div6 = document.createElement("div");
                    div6.id = "cat-clicks-feat";
                    /*create the div to hold the cat's name*/
                    document.getElementById("selected-cat").appendChild(div6);
                    /*get the text from the selected cat's name */
                    var selectedCatClicks = $('#number-clicks' + numCopy).text();
                    $('#cat-clicks-feat').text(selectedCatClicks);


            }
                };
            })(elementNo));


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
            $('#cat-name' + elementNo).click(function() {alert("You clicked element: " + elementNo);
        })

            model.clickCat(elementNo, catJSON);

        }
    };

    var viewList = {
        createKittyList: function(kitties, numberOfKitties) {
            console.log("kitties passed in: " + kitties);
            var elementNo = 0;
            var catName, catImage;
            var howManyKitties = prompt("How many kitties do you want to see?", "2");
            numberOfKitties = parseInt(howManyKitties);
            if (numberOfKitties > 0) {
            console.log("Number of Kittes: " + numberOfKitties);
                for (i = 0; i < numberOfKitties; i++)
                {
                    elementNo = i + 1;
                    catName = prompt("What's the name of kitty number " + elementNo + "?");
                    catImage = prompt("What's the URL for " + catName +"'s image?", "http://www.placekitten.com/600/300");
                    kitties.push([catName, catImage]);
                    console.log("kitties: " + kitties);
                    console.log("viewList init executed.")
                }
            }
                    octopus.getKittyList(kitties);
        },

        render: function(catJSON) {
            console.log("catJSON: " + catJSON)
            console.log("catJSON length:" + catJSON.length)
            for (var i = 0; i < catJSON.length; i++)
            {
            elementNo = i + 1;
            var h2 = document.createElement("h2");
            h2.id = "cat-name" + elementNo;
            document.getElementById("kitkat").appendChild(h2);
            $(h2).text(catJSON[i]["catName"]);
            console.log("catName: " + catJSON[i]["catName"]);

            var div2 = document.createElement("div");
            div2.id = "cat-pic" + elementNo;
            document.getElementById("kitkat").appendChild(div2);

            var img = document.createElement("img");
            img.src = catJSON[i]["catImage"];
            img.style = "display: none;";
            document.getElementById("cat-pic" + elementNo).appendChild(img);

            var div3 = document.createElement("div");
            div3.id = "number-clicks" + elementNo;
            div3.style = "visibility: hidden;";
            $(div3).text(catJSON[i]["catClicks"]);
            document.getElementById("kitkat").appendChild(div3);

            octopus.nameClick(elementNo, catJSON);
            }
        }
    };

    var viewSingleCat = {

    }



    octopus.init();
});