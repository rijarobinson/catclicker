$(function(){
    var kitties = [];
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
        catImage = prompt("What's the URL for " + catName +"'s image?");

        var div1 = document.createElement("div");
        div1.id = "cat-name" + elementNo;
        document.getElementById("kitkat").appendChild(div1);
        $(div1).text(catName);

        var div2 = document.createElement("div");
        div2.id = "cat-pic" + elementNo;
        document.getElementById("kitkat").appendChild(div2);

        var img = document.createElement("img");
        img.src = catImage;
        document.getElementById("cat-pic" + elementNo).appendChild(img);

/*        var div3 = document.createElement("div");
        div3.id = "number-clicks" + elementNo;
        $(div3).text(0);
        document.getElementById("kitkat").appendChild(div3);
*/


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
    }

});