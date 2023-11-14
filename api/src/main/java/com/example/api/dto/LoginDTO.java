package com.example.api.dto;


import com.example.api.entity.UserEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Data
public class LoginDTO {
    private String userId;
    private String userPassword;

    public static LoginDTO toLoginDTO(UserEntity userEntity) {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUserId(userEntity.getUserId());
        loginDTO.setUserPassword(userEntity.getUserPassword());

        return loginDTO;
    }
}

