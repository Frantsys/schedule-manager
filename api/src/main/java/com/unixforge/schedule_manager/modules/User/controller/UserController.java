package com.unixforge.schedule_manager.modules.User.controller;

import com.unixforge.schedule_manager.modules.User.dto.request.*;
import com.unixforge.schedule_manager.modules.User.dto.response.UserResponse;
import com.unixforge.schedule_manager.modules.User.dto.response.UserSummaryResponse;
import com.unixforge.schedule_manager.modules.User.service.UserService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name = "User", description = "API path for managing users")
@RestController 
@RequestMapping("/v1/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> findAll() {

        List<UserResponse> users = userService.findAll();

        return ResponseEntity.ok(users);

    }

    @GetMapping("/summary")
    public ResponseEntity<List<UserSummaryResponse>> findAllSummary() {

        List<UserSummaryResponse> users = userService.findAllSummary();

        return ResponseEntity.ok(users);

    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable Long id) {
        
        UserResponse user = userService.findById(id);

        return ResponseEntity.ok(user);
    
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable Long id, @RequestBody @Valid UserUpdateRequest request) {

        UserResponse user = userService.updateById(id, request);

        return ResponseEntity.ok(user);
        
    }

    @PatchMapping("/{id}/activation")
    public ResponseEntity<UserResponse> updateActivation(@PathVariable Long id, @RequestBody @Valid UserUpdateActivationRequest request) {
        
        UserResponse user = userService.updateActivationById(id, request);

        return ResponseEntity.ok(user);

    }

    @PatchMapping("/{id}/password")
    public ResponseEntity<UserResponse> changePasswordById(@PathVariable Long id, @RequestBody @Valid UserUpdatePasswordRequest request) {
        
        userService.updatePassword(id, request);

        return ResponseEntity.noContent().build();
        
    }

    
    

}
