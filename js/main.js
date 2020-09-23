$(document).ready(function() {

    var ApiKey = "b8431a02fcfae2bdf305630c317a0476";
    var movieApi = "https://api.themoviedb.org/3/search/movie";
    var serieAPI = "https://api.themoviedb.org/3/search/tv";

    // prendiamo valore input al click cerca
    $(".search").click(function() {
        var searchMovie = $(".input-search").val();
        
        resetSearch();
        getMovies(searchMovie);
    });

    // avvio la ricerca tramite il tasto invio
    $(".input-search").keyup(function() {

        if(event.which == 13) {
            var searchMovie = $(".input-search").val();

            resetSearch();
            getMovies(searchMovie);
        }

    });

    // funzione che si occupa della chiamata ajax e stampa il risultato
    function getMovies(searchString) {
        // chiamata ajax all'interno di una funzione click
        $.ajax(
            {
                "url": movieApi,
                "data": {
                    "api_key": ApiKey,
                    "query": searchString,
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
    }

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
                "vote" : getStarsVote(movies[i].vote_average)
            };
            // prepariamo il nostro html
            var html = template(context);
            // inseriamo il nostro html nel tag "ul"
            $("#list-movies").append(html);

        }
    }

    // funzione che svuota il campo input e lista <ul>
    function resetSearch() {
        // svuotare lista <ul> dei film e il campo input
        $("#list-movies").html("");
        //console.log(searchMovie);
        $(".input-search").val("");
    }


    // funzione che converte numeri voto in icona fontawesome
    function getStarsVote(vote) {
        // arrotondo numero per eccesso
        var newNum = Math.ceil(vote / 2);
        // definisco le icone
        var stars = "<i class='fas fa-star'></i>";
        var starsVote = "<i class='far fa-star'></i>";
        // variabile per stampare in seguito le stelle
        var vote = "";

        // ciclo for per assegnare i numeri convertiti in stelle da 1 a 5
        for(var i = 0; i < 5; i++) {
            if(i < newNum) {
                vote += stars;
            } else {
                vote += starsVote;
            }
        }
        return vote;
        
    }

});  



