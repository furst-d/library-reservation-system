package org.furstd.web_api.security.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationprovider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .exceptionHandling(exceptionHandling -> {
                    exceptionHandling.authenticationEntryPoint(new CustomAuthenticationEntryPoint());
                    exceptionHandling.accessDeniedHandler(new CustomAccessDeniedHandler());
                })
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "/books/**", "/authors/**", "/roles").permitAll()
                        .requestMatchers(HttpMethod.POST, "/users/register", "/users/login").permitAll()

                        .requestMatchers(HttpMethod.GET, "/users/**", "/reservations/**").hasAuthority("EDITOR")
                        .requestMatchers(HttpMethod.POST, "/books", "/authors", "/reservations").hasAuthority("EDITOR")
                        .requestMatchers(HttpMethod.PUT, "/books/**", "/authors/**", "/reservations/**").hasAuthority("EDITOR")
                        .requestMatchers(HttpMethod.DELETE, "/books/**", "/authors/**", "/reservations/**").hasAuthority("EDITOR")

                        .requestMatchers(HttpMethod.POST, "/users").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/users/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/users/**").hasAuthority("ADMIN")
                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationprovider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);



        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
