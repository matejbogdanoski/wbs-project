package mk.ukim.finki.wbsproject.services

import com.google.gson.Gson
import mk.ukim.finki.wbsproject.extensions.loggerFor
import okhttp3.*
import org.springframework.stereotype.Service

@Service
class HttpClientService(
        private val client: OkHttpClient
) {
    val logger = loggerFor<HttpClientService>()

    fun <R> get(url: String, headers: Map<String, String>, params: Map<String, String>,
                resultClass: Class<R>): R {
        val request: Request = Request.Builder()
                .url(buildUrl(url, params))
                .also { builder ->
                    headers.forEach { (name, value) -> builder.addHeader(name, value) }
                }.build()
        return performGet(request, resultClass)
    }

    fun <R> post(url: String, body: Any, mediaType: String, headers: Map<String, String>,
                 params: Map<String, String>, resultClass: Class<R>): R {
        val gson = Gson()
        val bodyJson = gson.toJson(body)
        val request = Request.Builder()
                .url(buildUrl(url, params))
                .also { builder ->
                    headers.forEach { (name, value) -> builder.addHeader(name, value) }
                }.post(RequestBody.create(MediaType.parse(mediaType), bodyJson))
                .build()
        return performPost(request, resultClass)
    }

    private fun <R> performGet(request: Request, resultClass: Class<R>): R {
        logger.debug("Performing GET request to the: ${request.url()}")
        val gson = Gson()
        val response: Response = client.newCall(request).execute()
        return gson.fromJson(response.body()?.string(), resultClass)
    }

    private fun <R> performPost(request: Request, resultClass: Class<R>): R {
        logger.debug("Performing POST request to the: ${request.url()}")
        val gson = Gson()
        val response: Response = client.newCall(request).execute()
        return gson.fromJson(response.body()?.string(), resultClass)
    }

    private fun buildUrl(url: String, queryParams: Map<String, String>) =
            HttpUrl.parse(url)?.newBuilder().also { urlBuilder ->
                queryParams.forEach { (name, value) -> urlBuilder?.addQueryParameter(name, value) }
            }?.build().toString()
}