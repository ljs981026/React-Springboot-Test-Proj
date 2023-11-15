package com.example.api.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // rest api 이므로 basic auth 및 csrf 보안을 사용 하지 않도록 설정
                .httpBasic().disable()
                .csrf().disable()
                // jwt 사용 하기 때문에 세션을 사용 하지 않도록 설정
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // 해당 api 에 대해서 모든 요청을 허가
                .antMatchers("/api/member/login").permitAll()
                .antMatchers("/api/member/signin").permitAll()
                .antMatchers("/api/member/isDupId").permitAll()
                .antMatchers("/api/member/token").permitAll()
//                .antMatchers("/api/user/join").permitAll()
                // USER 권한이 있어야 요청
                .antMatchers("/api/member/*").hasRole("USER")
                // 이 외에 모든 요청에 대해서 인증 필요
                .anyRequest().authenticated()
                .and()
                // jwt 인증을 위하여 직접 구현한 필터를 UsernamePasswordAuthenticationFilter 전에 실행
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    // jwt 를 사용 하기 위해서 필요한 password encoder
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
