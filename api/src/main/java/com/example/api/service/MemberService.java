package com.example.api.service;

import com.example.api.dto.LoginDTO;
import com.example.api.dto.TokenInfoDTO;
import com.example.api.jwt.JwtTokenProvider;
import com.example.api.repository.MemberRepository;
import com.example.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public TokenInfoDTO login(String memberId, String password) {
        // Login id/pw를 기반 으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인 하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberId, password);
        // 실제 검증 (사용자 비밀 번호 체크) 이루어 지는 부분
        // authenticate 메서드 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 인증 정보를 기반 으로 jwt 토큰 생성
        TokenInfoDTO tokenInfoDTO = jwtTokenProvider.generateToken(authentication);
        return tokenInfoDTO;
    }
}
