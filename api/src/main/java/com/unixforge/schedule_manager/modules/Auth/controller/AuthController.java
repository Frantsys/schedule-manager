package com.unixforge.schedule_manager.modules.Auth.controller;

import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "Auth", description = "API for managing authentication")
@RestController 
@RequestMapping("/v1/api/auth")
@RequiredArgsConstructor 
public class AuthController {
    
    

}
