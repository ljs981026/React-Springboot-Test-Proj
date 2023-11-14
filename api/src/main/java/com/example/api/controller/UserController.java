package com.example.api.controller;

import com.example.api.dto.LoginDTO;
import com.example.api.dto.UserDTO;
import com.example.api.entity.UserEntity;
import com.example.api.service.UserService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/save")
    public String saveForm(){
        return "save";
    }

    @PostMapping("/user/save")
    public boolean save(@RequestBody UserDTO userDTO) {
        System.out.println("UserController.save");
        System.out.println("userDTO = " + userDTO);
        return userService.save(userDTO);
    }

    @GetMapping("/user/all")
    public List<UserEntity> allUser() {
        return userService.allUser();
    }

    @PostMapping("/user/idchk")
    public boolean id_chk(String userId) {
        return userService.id_chk(userId);
    }

    @ApiOperation(value="로그인")
    @PostMapping("/user/login")
    public boolean login(LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }
}
