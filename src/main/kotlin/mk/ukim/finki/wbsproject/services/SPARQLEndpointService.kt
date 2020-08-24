package mk.ukim.finki.wbsproject.services

import mk.ukim.finki.wbsproject.constants.SPARQLEndpointConstants.dbpedia
import mk.ukim.finki.wbsproject.constants.SPARQLEndpointConstants.defaultParams
import mk.ukim.finki.wbsproject.dtos.sparql_endpoint.ResultWrapper
import org.springframework.stereotype.Service

@Service
class SPARQLEndpointService(
        private val client: HttpClientService
) {

    fun performQuery(query: String): ResultWrapper =
            client.get(dbpedia, emptyMap(), defaultParams.toMutableMap()
                    .apply { put("query", query) }, ResultWrapper::class.java)
}
