package com.example.api.service;

import com.example.api.entity.Member;
import com.example.api.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return memberRepository.findByMemberId(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
    }

    public String loadedUserByAuth(String username) throws UsernameNotFoundException {
        UserDetails user = loadUserByUsername(username);
        return user.getAuthorities().toString();
    }

    // 해당 하는 User 의 데이터 존재 한다면 UserDetails 객체로 만들어서 리턴
    private UserDetails createUserDetails(Member memberEntity) {
        return User.builder()
                .username(memberEntity.getUsername())
                .password(passwordEncoder.encode(memberEntity.getPassword()))
                .roles(memberEntity.getRoles().toArray(new String[0]))
                .build();
    }


}
