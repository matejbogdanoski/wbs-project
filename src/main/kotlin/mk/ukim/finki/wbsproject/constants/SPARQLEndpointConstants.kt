package mk.ukim.finki.wbsproject.constants

object SPARQLEndpointConstants {
    val dbpedia = "https://dbpedia.org/sparql"

    //query will be replaceable based on needs
    val defaultParams = mapOf(
            "default-graph-uri" to "http://dbpedia.org",
            "format" to "application/sparql-results+json",
            "CXML_redir_for_subjs" to "121",
            "CXML_redir_for_hrefs" to "",
            "timeout" to "30000",
            "debug" to "on",
            "run" to "Run Query"
    )
}