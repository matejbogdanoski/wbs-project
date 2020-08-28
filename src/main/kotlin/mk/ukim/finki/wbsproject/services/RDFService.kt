package mk.ukim.finki.wbsproject.services

import mk.ukim.finki.wbsproject.constants.Placeholders
import mk.ukim.finki.wbsproject.constants.SPARQLQueries.getCount
import mk.ukim.finki.wbsproject.constants.SPARQLQueries.queryLatestMovies
import mk.ukim.finki.wbsproject.dtos.RdfDto
import mk.ukim.finki.wbsproject.response.MoviePageResponse
import mk.ukim.finki.wbsproject.response.MovieResponse
import org.apache.jena.rdf.model.ModelFactory
import org.apache.jena.vocabulary.VCARD
import org.springframework.stereotype.Service

@Service
class RDFService(
        private val sparqlEndpointService: SPARQLEndpointService
) {

    private val cacheCount: MutableMap<String, Int?> = HashMap()

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
//        RDFDataMgr.write(System.out, model, Lang.RDFJSON)
        return list
    }

    fun getQueriedData(searchTerm: String, offset: Int): MoviePageResponse = MoviePageResponse(
            movies = getMovies(searchTerm, offset),
            length = getMoviesCount(searchTerm))

    private fun getMovies(searchTerm: String, offset: Int) = sparqlEndpointService.performQuery(
            queryLatestMovies(searchTerm, offset)).results.bindings.map {
        MovieResponse(title = it.title?.value,
                      thumbnail = it.thumbnail?.value ?: Placeholders.image,
                      abstract = it.abstract?.value?.let { abstract -> cutString(abstract, 300) },
                      year = it.year?.value)
    }

    private fun getMoviesCount(searchTerm: String): Int? = cacheCount[searchTerm] ?: run {
        val count = sparqlEndpointService.performQuery(
                getCount(searchTerm)).results.bindings[0].count?.value?.toInt()
        cacheCount[searchTerm] = count
        count
    }

    private fun cutString(it: String, maxLength: Int) = if (it.length > maxLength) it.substring(0, maxLength).plus(
            " ...") else it
}
