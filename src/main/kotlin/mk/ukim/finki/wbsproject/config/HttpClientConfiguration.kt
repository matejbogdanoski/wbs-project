package mk.ukim.finki.wbsproject.config

import okhttp3.OkHttpClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class HttpClientConfiguration {
    @Bean
    fun createHttpClient() = OkHttpClient()
}