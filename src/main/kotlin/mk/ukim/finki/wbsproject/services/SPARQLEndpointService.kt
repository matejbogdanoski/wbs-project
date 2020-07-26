package mk.ukim.finki.wbsproject.services

import mk.ukim.finki.wbsproject.constants.SPARQLConstants.dbpedia
import mk.ukim.finki.wbsproject.constants.SPARQLConstants.testQuery
import org.springframework.stereotype.Service

@Service
class SPARQLEndpointService(
        private val client: HttpClientService
) {

    fun getMovies(): Any =
            client.get("$dbpedia?$testQuery", emptyMap(), emptyMap(), Any::class.java)
}