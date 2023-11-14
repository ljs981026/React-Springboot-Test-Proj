package com.example.api.controller;

import com.example.api.dto.LoginDTO;
import com.example.api.dto.TokenInfoDTO;
import com.example.api.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class JwtController {

    private final MemberService jwtService;

    @Autowired
    public JwtController(MemberService jwtService) {
        this.jwtService = jwtService;
    }
}
