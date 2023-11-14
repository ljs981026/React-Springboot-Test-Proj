package com.example.api.service;

import com.example.api.dto.LoginDTO;
import com.example.api.dto.UserDTO;
import com.example.api.entity.UserEntity;
import com.example.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserEntity> allUser() {
        return userRepository.findAll();
    }

    public boolean save(UserDTO userDTO) {
        boolean is_exist = id_chk(userDTO.getUserId());
        if (is_exist) {
            return false;
        } else {
            UserEntity userEntity = UserEntity.toUserEntity(userDTO);
            userRepository.save(userEntity);
            return true;
        }
    }

    public boolean id_chk(String userId) {
        return userRepository.existsById(userId);
    }

    public boolean login(LoginDTO loginDTO) {
        String userId = loginDTO.getUserId();
        String userPassword = loginDTO.getUserPassword();

        if (userRepository.findById(userId).isPresent()) {
            UserEntity userEntity = userRepository.findById(userId).get();
            return userEntity.getUserPassword().equals(userPassword);
        }
        return false;
    }

}
