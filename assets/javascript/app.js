//Create an array of strings related to a topic
var favCeleb = ["beyonce", "rihanna", "tiffany haddish", "j cole", "drake", "nicki minaj", "will ferrell", "lebron james", "steve carell", "mariah carey", "nene leaks", "barack obama", "donald trump", "jonah hill", "rupaul"];

console.log(favCeleb)

var button;
var newCeleb = ""; // new topic that will be added from the input field

// function to create new buttons from the favCeleb array
function renderButtons(){
	
	// loops through the array and creates buttons
	for(i = 0; i < favCeleb.length; i++) {
		button = $("<button type=" + "button" + ">" + favCeleb[i] + "</button>").addClass("btn btn-light").attr("data",favCeleb[i]);
		$("#celeb-buttons").append(button);
	};
}


// The user clicks on a button to generate 10 static,gif images from GIPHY API 
$("#celeb-buttons").on("click", ".btn", function(){
  		var celebName = $(this).attr("data");
  		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebName + "&api_key=dc6zaTOxFJmzC&limit=10";



  		$.ajax({
  			url: queryURL,
  			method: "GET" 

  		}).then(function(response){
  			console.log(response);
  			
          	var results = response.data;

          	for (var i = 0; i < results.length; i++) {
          		
                  var celebDiv = $("<div>");
                  
	 			
	          	// Display the rating of the gif under each image
	 			var p = $("<p>");
	 			p.text(results[i].rating);
                 var p = $("<p>").text("Rating: " + results[i].rating);
                
	 			var topicImage = $("<img>");
	 			
	 			// Add still and animate states to the images
	 			topicImage.attr("src", results[i].images.fixed_height_still.url);
	 			topicImage.attr("data-still", results[i].images.fixed_height_still.url);
	 			topicImage.attr("data-animate", results[i].images.fixed_height.url)
	 			topicImage.attr("data-state", "still")
	 			topicImage.addClass("gif");
	 			
	 			// Appends the image to the div
	 			celebDiv.append(topicImage);
	 			// Appends the rating to the div
                 celebDiv.append(p); 
                 			
                 //Prepends new gif images to the gif area
                 
                 $("#celeb-gifs").prepend(celebDiv);
                 
 			}
  		})
  })


// Functions that animates the images when the user clicks the image. When the user clicks the image again, it stops playing.
$("#celeb-gifs").on("click", ".gif", function(event){
    event.preventDefault();
	
	// gets the current state of the clicked gif 
	var state = $(this).attr("data-state");
	
	// Toggles between still and animage depending on the current state of the image
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})
//Takes the user input and and pushes it into the favCeleb array. Function renderButtons is called to add the new topic (new celebrity) to the list of buttons


$(".submit").on("click", function(event){
	event.preventDefault();

	console.log("submit");
    //takes user input and sets value to newCeleb
	newCeleb = $("#celeb-input").val();
	// new topic is added to the favCeleb array 
	favCeleb.push(newCeleb);
	console.log(favCeleb);
	// call the function that creates the new button
	renderButtons();
});

renderButtons();
 
