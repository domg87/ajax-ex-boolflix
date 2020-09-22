$(document).ready(function() {

    var ApiKey = "b8431a02fcfae2bdf305630c317a0476";
    var movieApi = "https://api.themoviedb.org/3/search/movie";

    // prendiamo valore input al click cerca
    $(".search").click(function() {
        var searchMovie = $(".input-search").val();

        // chiamata ajax
        $.ajax(
            {
                "url": movieApi,
                "data": {
                    "api_key": ApiKey,
                    "query": searchMovie,
                    "language": "it-IT"
                },
                "method": "GET",
                "success": function(data) {
                    var risultato = data.results;
                    renderMovie(risultato);
                },
                "error": function(errore) {
                    alert("Errore");
                }
            }
        );
        $(".input-search").val("");
        console.log(searchMovie);

    });

    function renderMovie(movies) {
        // handlebars template
        var source = $("#movie-template").html();
        var template = Handlebars.compile(source);

        // stampiamo ogni film ricercato nella chiamata
        for(var i = 0; i < movies.length; i++) {
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

});  



