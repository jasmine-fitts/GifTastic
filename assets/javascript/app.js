$(document).ready(function(){
    //Create an array of strings, each related to a topic
    var topicArray =  ["beyonce", "rihanna", "normani", "j cole", "drake", "nicki minaj"];
    console.log(topicArray)

    function displayImg(){ 
        $("#display-images").empty();
        var input = (this).attr("data-name");
        var gifLimit = 10;
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + input + "&limit" + gifLimit + "&api_key=71iRTGGKGKOSTCjTz5LhEuyfUCN4shDr";

        $.ajax ({
            url: queryURL,
            method: "GET",
        }).done(function(response) {
            for (var i = 0; i < gifLimit; i++ ) {
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                var image = $("<img>");

                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                images.attr("data-state", "still");
                images.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[i].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating:" + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }

    function renderButtons(){
        $("#display-buttons").empty();

        for (var l = 0; l < displayButtons.length; l++){
            var newButton = $("<button>")
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")
            newButton.attr("data-name", displayedButtons[l]);
            newButton.text(displayedButtons[l]);
            $("display-buttons").append(newButton);
        }
    }

    function imageState() {
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillIMage);
            $(this).attr("data-state", "still");
        }
    }

    $("#submitBtn").on("click", function(){
        var input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);

        renderButtons();

    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageState);
    
});
