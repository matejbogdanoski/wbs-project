package mk.ukim.finki.wbsproject.response

data class MoviePageResponse(
        val movies: List<MovieResponse>,
        val length: Int?
)
