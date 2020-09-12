package mk.ukim.finki.wbsproject.vocabulary

import org.apache.jena.rdf.model.Model
import org.apache.jena.rdf.model.ModelFactory
import org.apache.jena.rdf.model.Property

object DBO {
    private val model: Model = ModelFactory.createDefaultModel()

    private const val uri = "http://dbpedia.org/ontology/"

    public val abstract: Property = model.createProperty(uri, "abstract")
    public val thumbnail: Property = model.createProperty(uri, "thumbnail")
    public val language: Property = model.createProperty(uri, "language")
    public val releaseDate: Property = model.createProperty(uri, "releaseDate")


}
