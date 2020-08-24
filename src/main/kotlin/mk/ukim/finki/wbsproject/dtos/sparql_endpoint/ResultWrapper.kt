package mk.ukim.finki.wbsproject.dtos.sparql_endpoint

data class ResultWrapper(
        val head: Head,
        val results: Results
)

data class Head(
        val link: List<Any>,
        val vars: List<String>
)

data class Results(
        val distinct: Boolean,
        val ordered: Boolean,
        val bindings: List<RdfMovie>
)
