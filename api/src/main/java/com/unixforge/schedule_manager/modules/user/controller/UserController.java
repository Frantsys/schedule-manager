package com.unixforge.schedule_manager.modules.user.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unixforge.schedule_manager.modules.user.dto.request.UserCreateRequest;
import com.unixforge.schedule_manager.modules.user.dto.request.UserUpdateActivationRequest;
import com.unixforge.schedule_manager.modules.user.dto.request.UserUpdatePasswordRequest;
import com.unixforge.schedule_manager.modules.user.dto.request.UserUpdateRequest;
import com.unixforge.schedule_manager.modules.user.dto.response.UserFilterResponse;
import com.unixforge.schedule_manager.modules.user.dto.response.UserResponse;
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
    public ResponseEntity<UserResponse> create(@RequestBody @Valid UserCreateRequest DTO) {   
        UserResponse createdUser = userService.createUser(DTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable Long id) {
        UserResponse user = userService.findById(id);

        return ResponseEntity.ok(user);
    }

    @GetMapping()
    public ResponseEntity<List<UserResponse>> findAll() {
        List<UserResponse> users = userService.findAll();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable Long id, @RequestBody @Valid UserUpdateRequest DTO) {
        UserResponse updatedUser = userService.updateById(id, DTO);

        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{id}/activation")
    public ResponseEntity<UserResponse> updateStatus(@PathVariable Long id, @RequestBody @Valid UserUpdateActivationRequest DTO) {
        UserResponse updatedUser = userService.updateActivationById(id, DTO);

        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{id}/password")
    public ResponseEntity<UserResponse> changePasswordById(@PathVariable Long id, @RequestBody @Valid UserUpdatePasswordRequest DTO) {
        userService.changePassword(id, DTO);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<UserResponse>> listUsers(@RequestParam UserFilterResponse filterDTO) {
        List<UserResponse> users = userService.listUsers(filterDTO);

        return ResponseEntity.ok(users);
    }
    
    

}
