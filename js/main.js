$(document).ready(function() {

    var ApiKey = "b8431a02fcfae2bdf305630c317a0476";
    //var movieApi = "https://api.themoviedb.org/3/search/movie";
    //var serieAPI = "https://api.themoviedb.org/3/search/tv";

    // prendiamo valore input al click cerca
    $(".search").click(function() {
        // richiamo funzione search
        search();
    });

    // avvio la ricerca tramite il tasto invio
    $(".input-search").keyup(function() {

        if(event.which == 13) {
            // richiamo funzione search
            search();
        }

    });

    // funzione di ricerca generica
    function search() {
        // prendere il valore della input
        var searchMovie = $(".input-search").val();

        // richiamo funzione reset
        resetSearch();
        // richiamo funzione film
        getData("movie", searchMovie);
        // richiamo funzione serie tv
        getData("tv", searchMovie);
    }


    // funzione generica chiamata ajax getData
    function getData(type, searchString) {
        $.ajax(
            {
                "url": "https://api.themoviedb.org/3/search/"+type,
                "data": {
                    "api_key": ApiKey,
                    "query": searchString,
                    "language": "it-IT"
                },
                "method": "GET",
                "success": function(data) {
                    var results = data.results;
                    renderResults(type,results);
                },
                "error": function(error) {
                    alert("Errore");
                }
            }
        );
    }
    

    function renderResults(type, results) {
        // handlebars template
        var source = $("#movie-template").html();
        var template = Handlebars.compile(source);

        // stampiamo ogni film ricercato nella chiamata
        for(var i = 0; i < results.length; i++) {
            // creo 2 variabili generiche da passare al context
            
            var title, original_title, container;

            if(type == "movie") {
                title = results[i].title;
                original_title = results[i].original_title;
                container = $("#list-movies");
            } else if (type == "tv") {
                title = results[i].name;
                original_title = results[i].name;
                container = $("#list-series");
            }

            // condizione per inserire img poster, se il film non ha poster "null" stampo img di default, altrimenti il poster API
            if (results[i].poster_path == null) {
                var poster = "img/no_poster.png";
            } else {
                var poster = "https://image.tmdb.org/t/p/w342"+results[i].poster_path;
            }
            console.log(poster);

            var context = {
                "poster": poster,
                "title" : title,
                "title_original" : original_title,
                "lang" : getFlags(results[i].original_language),
                "vote" : getStarsVote(results[i].vote_average),
                "overview": results[i].overview,
                "type": type
            };
            // prepariamo il nostro html
            var html = template(context);
            // inseriamo il nostro html nel tag "ul"
            container.append(html);

        }
    }

    // funzione che svuota il campo input e lista <ul>
    function resetSearch() {
        // svuotare lista <ul> dei film e il campo input
        $("#list-movies").html("");
        // svuotare lista <ul> delle series e il campo input
        $("#list-series").html("");
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
    // funzione che sostituisce la lingua con icone bandierine
    function getFlags(lang) {
        var flags = [
            "en",
            "it",
            "es",
            "fr"
        ];

        if(flags.includes(lang)) {
            return "<img class='flag' src='img/"+lang+".svg'>";
        }

        return lang;
    }


});  



