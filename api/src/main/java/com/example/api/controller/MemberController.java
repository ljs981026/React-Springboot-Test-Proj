package com.example.api.controller;

import com.example.api.dto.MemberDTO;
import com.example.api.dto.MemberLoginRequestDTO;
import com.example.api.dto.TokenInfoDTO;
import com.example.api.service.CustomUserDetailService;
import com.example.api.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {
    private final MemberService memberService;
    private final CustomUserDetailService customUserDetailService;


    @PostMapping("/member/login")
    public TokenInfoDTO login(@RequestBody MemberLoginRequestDTO memberLoginRequestDTO) {
        String memberId = memberLoginRequestDTO.getMemberId();
        String password = memberLoginRequestDTO.getPassword();
        TokenInfoDTO tokenInfoDTO = memberService.login(memberId, password);
        return tokenInfoDTO;
    }

    @PostMapping("/member/isDupId")
    public boolean idChk(String memberId) {
        return memberService.idChk(memberId);
    }

    @PostMapping("/member/signin")
    public boolean signin(@RequestBody MemberDTO memberDTO) {
        return memberService.save(memberDTO);
    }

    @PostMapping("/member/token")
    public boolean isVal(String token) {
        return memberService.isValidated(token);
    }
}