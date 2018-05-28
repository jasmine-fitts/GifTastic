$(document).ready(function(){
    //Create an array of strings, each related to a topic
    var favCeleb =  ["beyonce", "rihanna", "normani", "j cole", "drake", "nicki minaj", "taylor swift", "kim kardashian", "lebron james", "kobe bryant", "mariah carey", "nene leaks", "barack obama", "donald trump"];
    

    //Function for dumping the JSON content for each button into the div 



    //Functions that captures the celebrity name in an attribute

    function celebName() {
        var celebName = $(this).attr("data-name");
    }

    //Function for displaying celebrity data

    function renderButtons() {
    
    $("#celeb-buttons").empty();

    //Loops through the array of celebrities
    for (var i = 0; i < favCeleb.length; i++) {
        console.log(favCeleb);

    //Dynamically generate a button for each celebrity in the array
    //THis code $("<button>") is all jQuery needs to create the start and end tag (<button><button>)
    var a = $("<button>");
    //Add a class to the button
    a.addClass("celeb");
    //Add a data-attribute
    a.attr("data-name", favCeleb[i]);
    //Provide the intial button text
    a.text(favCeleb[i]);
    //Add the button to the hmtl 
    $("#celeb-buttons").append(a);
    }
    }

    //This function handles events where one button is clicked

    $("#add-celeb").on("click", function(event) {
    
    //Prevents the buttons default behavor when click (which is submitting a form)

    event.preventDefault();

    //This line grabs the input from the textbox

    var newCeleb = $("#celeb-input").val().trim();

    //Adds the celebrity from the textbox to the favCeleb array

    favCeleb.push(newCeleb);

    //Calling renderButtons which handles the processing of the favCeleb array

    renderButtons();
    });

    $(document).on("click", displayGifs);

    renderButtons();

    function displayGifs() {
        var limit = 10
        var celebName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebName + "&api_key=71iRTGGKGKOSTCjTz5LhEuyfUCN4shDr" + "&limit" + limit;


        https://api.giphy.com/v1/gifs/search?q=

        $.ajax({
            url: queryURL, 
            method: "GET", 
        }).then(function(response) {
            console.log(response);
            renderButtons()

            var image = $("<img>"); 
            image.attr("src", response.data[i].images.original_still.url);
            image.attr("data-still", response.data[i].images.original_still.url);
            image.attr("data-animate", response.data[i].images.original.url);
            image.attr("data-state", "still");
            image.attr("class", "gif");
            $("#celebrity-gifs").append(image);

            var gifRating = response.data[i].rating;
            console.log(response);
            var pRating = $("<p>").text("Rating" + gifRating);
            $("#celebrity-gifs").append(gifRating);


        })
    }



})




