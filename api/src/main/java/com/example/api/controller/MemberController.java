package com.example.api.controller;

import com.example.api.dto.MemberLoginRequestDTO;
import com.example.api.dto.TokenInfoDTO;
import com.example.api.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/member/login")
    public TokenInfoDTO login(@RequestBody MemberLoginRequestDTO memberLoginRequestDTO) {
        String memberId = memberLoginRequestDTO.getMemberId();
        String password = memberLoginRequestDTO.getPassword();
        TokenInfoDTO tokenInfoDTO = memberService.login(memberId, password);
        return tokenInfoDTO;
    }

    @PostMapping("/member/test")
    public String test() {
        return "success";
    }
}