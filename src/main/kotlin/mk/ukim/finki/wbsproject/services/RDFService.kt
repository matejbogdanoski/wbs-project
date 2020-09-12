package mk.ukim.finki.wbsproject.services

import mk.ukim.finki.wbsproject.constants.FilePaths
import mk.ukim.finki.wbsproject.constants.Placeholders
import mk.ukim.finki.wbsproject.constants.SPARQLQueries.getCount
import mk.ukim.finki.wbsproject.constants.SPARQLQueries.queryLatestMovies
import mk.ukim.finki.wbsproject.dtos.RdfDto
import mk.ukim.finki.wbsproject.request.MovieCreateRequest
import mk.ukim.finki.wbsproject.response.MoviePageResponse
import mk.ukim.finki.wbsproject.response.MovieResponse
import mk.ukim.finki.wbsproject.vocabulary.DBO
import org.apache.jena.rdf.model.ModelFactory
import org.apache.jena.rdf.model.Statement
import org.apache.jena.riot.Lang
import org.apache.jena.riot.RDFDataMgr
import org.apache.jena.sparql.vocabulary.FOAF
import org.springframework.stereotype.Service
import java.io.File

@Service
class RDFService(
        private val sparqlEndpointService: SPARQLEndpointService
) {

    private val cacheCount: MutableMap<String, Int?> = HashMap()

    fun createFavourite(movie: MovieCreateRequest) {
        val model = ModelFactory.createDefaultModel()
        model.createResource(movie.resource)
                .addProperty(FOAF.name, movie.title)
                .addProperty(DBO.abstract, movie.abstract)
                .addProperty(DBO.thumbnail, movie.thumbnail)
                .addProperty(DBO.releaseDate, movie.year)

        val file = File(FilePaths.FAVOURITES)
        if (file.length() > 0) {
            val input = RDFDataMgr.open(FilePaths.FAVOURITES)
            model.read(input, null)
        }

        val outputStream = file.outputStream()
        RDFDataMgr.write(outputStream, model, Lang.RDFXML)
    }

    fun getFavourites(): List<MovieResponse> {
        val model = ModelFactory.createDefaultModel()
        val iter = model.listStatements()
        val list = mutableListOf<RdfDto>()
        val input = RDFDataMgr.open(FilePaths.FAVOURITES)
        model.read(input, null)
        while (iter.hasNext()) {
            val stmt = iter.nextStatement()
            val subject = stmt.subject
            val predicate = stmt.predicate
            val obj = stmt.`object`
            list.add(RdfDto(subject = subject.toString(),
                            predicate = predicate.toString(),
                            `object` = obj.toString()))
        }
        return mapRdfDtoToMovieResponse(list)
    }

    fun deleteFavourite(resource: String) {
        val model = ModelFactory.createDefaultModel()
        val iter = model.listStatements()
        val file = File(FilePaths.FAVOURITES)
        val input = RDFDataMgr.open(FilePaths.FAVOURITES)
        model.read(input, null)

        val toDelete = mutableListOf<Statement>()
        while (iter.hasNext()) {
            val stmt = iter.nextStatement()
            val subject = stmt.subject
            if (subject.uri == resource) {
                toDelete.add(stmt)
            }
        }

        toDelete.forEach { model.remove(it) }

        val outputStream = file.outputStream()
        RDFDataMgr.write(outputStream, model, Lang.RDFXML)
    }

    fun getQueriedData(searchTerm: String, offset: Int): MoviePageResponse = MoviePageResponse(
            movies = getMovies(searchTerm, offset),
            length = getMoviesCount(searchTerm))

    private fun getMovies(searchTerm: String, offset: Int): List<MovieResponse> = sparqlEndpointService.performQuery(
            queryLatestMovies(searchTerm, offset)).results.bindings.map {
        MovieResponse(title = it.title?.value,
                      thumbnail = it.thumbnail?.value ?: Placeholders.image,
                      abstract = it.abstract?.value,
                      year = it.year?.value,
                      resource = it.film_title?.value)
    }

    private fun getMoviesCount(searchTerm: String): Int? = cacheCount[searchTerm] ?: run {
        val count = sparqlEndpointService.performQuery(
                getCount(searchTerm)).results.bindings[0].count?.value?.toInt()
        cacheCount[searchTerm] = count
        count
    }

    private fun mapRdfDtoToMovieResponse(rdfDtos: List<RdfDto>): List<MovieResponse> = rdfDtos.groupBy { it.subject }
            .map { group ->
                MovieResponse(title = group.value.find { it.predicate == FOAF.name.uri }?.`object`,
                              thumbnail = group.value.find { it.predicate == DBO.thumbnail.uri }?.`object`,
                              abstract = group.value.find { it.predicate == DBO.abstract.uri }?.`object`,
                              year = group.value.find { it.predicate == DBO.releaseDate.uri }?.`object`,
                              resource = group.key)
            }
}
