package mk.ukim.finki.wbsproject.api

import mk.ukim.finki.wbsproject.request.MovieCreateRequest
import mk.ukim.finki.wbsproject.response.MoviePageResponse
import mk.ukim.finki.wbsproject.services.RDFService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/data")
class DataController(
        private val service: RDFService
) {

    @GetMapping("/sparql/movies")
    fun getQueriedData(
            @RequestParam(required = false, defaultValue = "") searchTerm: String,
            @RequestParam(required = false, defaultValue = "0") offset: Int
    ): MoviePageResponse = service.getQueriedData(searchTerm, offset)

    @GetMapping("/favourites")
    fun getFavourites() = service.getFavourites()

    @PostMapping("/favourites")
    fun createFavourite(@RequestBody request: MovieCreateRequest) = service.createFavourite(request)

    @DeleteMapping("/favourites")
    fun deleteFavourite(@RequestParam resource: String) = service.deleteFavourite(resource)
}
