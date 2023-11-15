package com.example.api.dto;

import com.example.api.entity.Member;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Data
public class MemberDTO {
    private String memberId;
    private String password;
    private List<String> roles;
    private String email;
    private String nickName;
}
