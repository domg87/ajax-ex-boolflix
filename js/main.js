$(document).ready(function() {

    var searchMovie = "rambo";

    $.ajax(
        {
            "url": "https://api.themoviedb.org/3/search/movie",
            "data": {
                "api_key": "b8431a02fcfae2bdf305630c317a0476",
                "query": searchMovie,
                "language": "it-IT"
            },
            "method": "GET",
            "success": function(data) {
                renderMovie(data.results);
            },
            "error": function(errore) {
                alert("Errore");
            }
        }
    );

});

// FUNZIONI SCRIPT
function renderMovie(movies) {

    var source = $("#movie-template").html();
    var template = Handlebars.compile(source);



    // stampare ogni film ricevuto dalla chiamata API

    for(var i = 0; i < movies.length; i++) {
        // prepariamo il context
        var context = {
            "title" : movies[i].title,
            "title_original" : movies[i].original_title,
            "lang" : movies[i].original_language,
            "vote" : movies[i].vote_avarage
        };

        // prepariamo il nostro html
        var html = template(context);
        // inseriamo il nostro html nel tag "ul"
        $("#list-movies").append(html);
    }
}