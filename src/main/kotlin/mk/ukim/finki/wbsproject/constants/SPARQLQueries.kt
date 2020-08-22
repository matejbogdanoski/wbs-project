package mk.ukim.finki.wbsproject.constants

object SPARQLQueries {
    fun queryLatestMovies(searchTerm: String = "") = "SELECT * WHERE {\n" +
            "            ?film_title a dbo:Film .\n" +
            "            OPTIONAL {?film_title foaf:name ?title } \n" +
            "            OPTIONAL {?film_title dbo:thumbnail ?thumbnail .}\n" +
            "            OPTIONAL {?film_title dbo:language ?language .}\n" +
            "            ?film_title dbo:releaseDate ?year\n" +
            "            FILTER(?language = dbr:English_language)\n" +
            "            FILTER(?title LIKE '%$searchTerm%')\n" +
            "            }\n" +
            "ORDER BY DESC (?year)"

    fun queryLatestShows(searchTerm: String = "") = "SELECT * WHERE {\n" +
            "            ?film_title a dbo:TelevisionShow .\n" +
            "            OPTIONAL {?film_title foaf:name ?title } \n" +
            "            OPTIONAL {?film_title dbo:thumbnail ?thumbnail .}\n" +
            "            OPTIONAL {?film_title dbo:language ?language .}\n" +
            "            ?film_title dbo:releaseDate ?year\n" +
            "            FILTER(?language = dbr:English_language)\n" +
            "            FILTER(?title LIKE '%$searchTerm%')\n" +
            "            }\n" +
            "ORDER BY DESC (?year)"
}