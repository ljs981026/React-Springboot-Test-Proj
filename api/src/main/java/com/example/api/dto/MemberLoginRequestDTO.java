package com.example.api.dto;

import lombok.Data;

@Data
public class MemberLoginRequestDTO {
    private String memberId;
    private String password;
}
