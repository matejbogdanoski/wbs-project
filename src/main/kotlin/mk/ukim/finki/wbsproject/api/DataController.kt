package mk.ukim.finki.wbsproject.api

import mk.ukim.finki.wbsproject.response.MoviePageResponse
import mk.ukim.finki.wbsproject.services.RDFService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/data")
class DataController(
        private val service: RDFService
) {
    @GetMapping("/test")
    fun test() = service.getData()

    @GetMapping("/sparql/movies")
    fun getQueriedData(
            @RequestParam(required = false, defaultValue = "") searchTerm: String,
            @RequestParam(required = false, defaultValue = "0") offset: Int
    ): MoviePageResponse = service.getQueriedData(searchTerm, offset)
}
