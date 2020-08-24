package mk.ukim.finki.wbsproject.api

import mk.ukim.finki.wbsproject.services.RDFService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/data")
class DataController(
        private val service: RDFService
) {
    @GetMapping("/test")
    fun test() = service.getData()

    @GetMapping("/sparql/movies")
    fun getQueriedData() = service.getQueriedData()
}
