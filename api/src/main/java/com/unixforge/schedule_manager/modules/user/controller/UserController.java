package com.unixforge.schedule_manager.modules.user.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unixforge.schedule_manager.modules.user.dto.UserActivationDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserCreateDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserFilterDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserResponseDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserUpdateDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserUpdatePasswordDTO;
import com.unixforge.schedule_manager.modules.user.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@Tag(name = "User", description = "API for managing users")
@RestController
@RequestMapping("/v1/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @PostMapping()
    public ResponseEntity<UserResponseDTO> create(@RequestBody @Valid UserCreateDTO DTO) {   
        UserResponseDTO createdUser = userService.createUser(DTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> findById(@PathVariable Long id) {
        UserResponseDTO user = userService.findById(id);

        return ResponseEntity.ok(user);
    }

    @GetMapping()
    public ResponseEntity<List<UserResponseDTO>> findAll() {
        List<UserResponseDTO> users = userService.findAll();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> update(@PathVariable Long id, @RequestBody @Valid UserUpdateDTO DTO) {
        UserResponseDTO updatedUser = userService.updateById(id, DTO);

        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{id}/activation")
    public ResponseEntity<UserResponseDTO> updateStatus(@PathVariable Long id, @RequestBody @Valid UserActivationDTO DTO) {
        UserResponseDTO updatedUser = userService.updateActivationById(id, DTO);

        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{id}/password")
    public ResponseEntity<UserResponseDTO> changePasswordById(@PathVariable Long id, @RequestBody @Valid UserUpdatePasswordDTO DTO) {
        userService.changePassword(id, DTO);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<UserResponseDTO>> listUsers(@RequestParam UserFilterDTO filterDTO) {
        List<UserResponseDTO> users = userService.listUsers(filterDTO);

        return ResponseEntity.ok(users);
    }
    
    

}
