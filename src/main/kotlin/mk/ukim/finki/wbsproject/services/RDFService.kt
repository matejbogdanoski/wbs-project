package mk.ukim.finki.wbsproject.services

import mk.ukim.finki.wbsproject.dtos.RdfDto
import org.apache.jena.rdf.model.ModelFactory
import org.apache.jena.vocabulary.VCARD
import org.springframework.stereotype.Service

@Service
class RDFService(
        private val sparqlEndpointService: SPARQLEndpointService
) {

    fun getData(): MutableList<RdfDto> {
        val model = ModelFactory.createDefaultModel()
        model.createResource("http://somewhere/JohnSmith")
                .addProperty(VCARD.FN, "Matej Bogdanoski")
                .addProperty(VCARD.N,
                        model.createResource()
                                .addProperty(VCARD.Given, "Matej")
                                .addProperty(VCARD.Family, "Bogdanoski"))
        val iter = model.listStatements()

        val list = mutableListOf<RdfDto>()

        while (iter.hasNext()) {
            val stmt = iter.nextStatement()
            val subject = stmt.subject
            val predicate = stmt.predicate
            val obj = stmt.`object`
            list.add(RdfDto(subject = subject.toString(),
                    predicate = predicate.toString(),
                    `object` = obj.toString()))
        }
        return list
    }

    fun getQueriedData() = sparqlEndpointService.getMovies()
}