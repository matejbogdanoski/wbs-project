package mk.ukim.finki.wbsproject.dtos.sparql_endpoint

data class RdfMovie(
        val film_title: SparqlResource?,
        val title: SparqlResource?,
        val language: SparqlResource?,
        val year: SparqlResource?,
        val thumbnail: SparqlResource?,
        val abstract: SparqlResource?
)

data class SparqlResource(
        val type: String?,
        val value: String?,
        val datatype: String?
)
