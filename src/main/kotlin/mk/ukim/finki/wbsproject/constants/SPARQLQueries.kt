package mk.ukim.finki.wbsproject.constants

object SPARQLQueries {
    val queryMovies = "SELECT DISTINCT ?film_title ?film_abstract\n" +
            "WHERE {\n" +
            "?film_title rdf:type <http://dbpedia.org/ontology/Film> .\n" +
            "?film_title rdfs:comment ?film_abstract \n" +
            "} LIMIT 1000 OFFSET 0"
}