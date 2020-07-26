package mk.ukim.finki.wbsproject.constants

object SPARQLConstants {
    val dbpedia = "https://dbpedia.org/sparql"
    val testQuery = "https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=SELECT+DISTINCT+%3Ffilm_title+%3Ffilm_abstract%0D%0AWHERE+%7B%0D%0A%3Ffilm_title+rdf%3Atype+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2FFilm%3E+.%0D%0A%3Ffilm_title+rdfs%3Acomment+%3Ffilm_abstract+%0D%0A%7D+LIMIT+1000+OFFSET+0&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30000&debug=on&run=+Run+Query+"
}