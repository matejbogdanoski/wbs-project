package mk.ukim.finki.wbsproject.services

import mk.ukim.finki.wbsproject.constants.SPARQLEndpointConstants.dbpedia
import mk.ukim.finki.wbsproject.constants.SPARQLEndpointConstants.defaultParams
import org.springframework.stereotype.Service

@Service
class SPARQLEndpointService(
        private val client: HttpClientService
) {

    fun performQuery(query: String): Any =
            client.get(dbpedia, emptyMap(), defaultParams.toMutableMap()
                    .apply { put("query", query) }, Any::class.java)
}