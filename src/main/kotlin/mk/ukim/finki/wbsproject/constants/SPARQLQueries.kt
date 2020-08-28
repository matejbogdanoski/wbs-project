package mk.ukim.finki.wbsproject.constants

object SPARQLQueries {
    fun queryLatestMovies(searchTerm: String = "", offset: Int = 0) = "SELECT * WHERE {\n" +
            "            ?film_title a dbo:Film .\n" +
            "            OPTIONAL {?film_title foaf:name ?title } \n" +
            "            OPTIONAL {?film_title dbo:thumbnail ?thumbnail .}\n" +
            "            OPTIONAL {?film_title dbo:language ?language .}\n" +
            "            ?film_title dbo:releaseDate ?year\n" +
            "            FILTER(?language = dbr:English_language)\n" +
            "            OPTIONAL {?film_title dbo:abstract ?abstract .}\n" +
            "            FILTER(lcase(str(?title)) LIKE '%$searchTerm%')\n" +
            "            }\n" +
            "ORDER BY DESC (?year) LIMIT 9 OFFSET ${offset * 9}"

    fun getCount(searchTerm: String = "") = "SELECT ( COUNT( DISTINCT * ) AS ?count ) WHERE {\n" +
            "            ?film_title a dbo:Film .\n" +
            "            OPTIONAL {?film_title foaf:name ?title }\n" +
            "            OPTIONAL {?film_title dbo:thumbnail ?thumbnail .}\n" +
            "            OPTIONAL {?film_title dbo:language ?language .}\n" +
            "            ?film_title dbo:releaseDate ?year\n" +
            "            FILTER(?language = dbr:English_language)\n" +
            "            OPTIONAL {?film_title dbo:abstract ?abstract .}\n" +
            "            FILTER(lcase(str(?title)) LIKE '%$searchTerm%')\n" +
            "            }"

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
