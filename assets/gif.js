var giffy = {
  animals: ["lion", "tiger", "wolf", "duck", "frog"],

  showButtons: function() {
    $("#buttonsDiv").empty();

    for (var i = 0; i < this.animals.length; i++) {
      var newBtn = $("<button class='btn btn-md btn-danger animal'>");
      newBtn.attr("data-topic", this.animals[i]);
      newBtn.text(this.animals[i]);
      $("#buttonsDiv").append(newBtn);
    }
  },

  clearGifDiv: function() {
    $("#gifDiv").empty();
  },

  animalAjax: function(search) {
    var queryObj = {
        q: search,
        limit: 10,
        rating: "pg",
        fmt: "json",
        api_key: "dc6zaTOxFJmzC"
    };

      var URL = "https://api.giphy.com/v1/gifs/search?";
      var queryURL = URL + $.param(queryObj)
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

          var animalDiv = $("<div>");
            var p = $("<p>");
          p.text("Rated: " + results[i].rating);

          var animalImage = $("<img>");

          animalImage.attr("src", results[i].images.original_still.url);
          animalImage.attr("gifSrc", results[i].images.fixed_height.url)
          animalImage.attr("stillSrc", results[i].images.original_still.url)
          animalImage.attr("state", 0);


        animalDiv.append(p);

          animalDiv.append(animalImage);

          animalDiv.attr("class", "images");

          $("#gifDiv").prepend(animalDiv);

          }

        $("img").on("click", function(){
          if ($(this).attr("state") == 1){
              $(this).attr("src", $(this).attr("stillSrc"));
              $(this).attr("state", 0);
          }
          else{
              $(this).attr("src", $(this).attr("gifSrc"));
              $(this).attr("state", 1);
          }
        });
    }); //end of ajax
  }, //end of animalAjax

  pushToArray: function(){
    var newAnimal = $("#add-animal").val().trim();
    var animalButtons = this.animals;
    animalButtons.push(newAnimal);
  },

};//end of object

giffy.showButtons();

$(".animal").on('click', function(){
  giffy.clearGifDiv();
  giffy.animalAjax($(this).data("topic"));

});


$("#addAnimal").on('click', function(event){
  event.preventDefault();
  giffy.pushToArray();
  giffy.showButtons();

$(".animal").on('click', function(){
  giffy.clearGifDiv();
  giffy.animalAjax($(this).data("topic"));

});

});