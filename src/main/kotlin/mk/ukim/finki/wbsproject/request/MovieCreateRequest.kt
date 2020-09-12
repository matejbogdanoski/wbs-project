package mk.ukim.finki.wbsproject.request

data class MovieCreateRequest(
        val title: String?,
        val thumbnail: String?,
        val abstract: String?,
        val year: String?,
        val resource: String?
)
