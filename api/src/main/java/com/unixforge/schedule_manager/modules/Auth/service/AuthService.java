package com.unixforge.schedule_manager.modules.Auth.service;

import com.unixforge.schedule_manager.exception.ConflictException;
import com.unixforge.schedule_manager.modules.Auth.dto.request.UserLoginRequest;
import com.unixforge.schedule_manager.modules.Auth.dto.request.UserRegisterRequest;
import com.unixforge.schedule_manager.modules.Auth.dto.response.UserLoginResponse;
import com.unixforge.schedule_manager.modules.User.dto.response.UserResponse;
import com.unixforge.schedule_manager.modules.User.mapper.UserMapper;
import com.unixforge.schedule_manager.modules.User.model.User;
import com.unixforge.schedule_manager.modules.User.model.UserRole;
import com.unixforge.schedule_manager.modules.User.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @Transactional
    public UserResponse userRegister(UserRegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("E-mail já cadastrado");
        }

        if (userRepository.existsByCpf(request.getCpf())) {
            throw new ConflictException("CPF já cadastrado");
        }

        User user = userMapper.toEntity(request);

        // passwordEncoder efetua a criptografia de uma senha
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.ROLE_STUDENT);
        user.setIsActive(true);

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);

    }

    public UserLoginResponse userLogin(UserLoginRequest request) {

        UsernamePasswordAuthenticationToken credentials =
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

        // Procura um AuthenticationProvider capaz de lidar com o token
        Authentication authentication = authenticationManager.authenticate(credentials);

        // Se chegou aqui, as credenciais são válidas; o principal é o próprio User
        User authenticatedUser = (User) authentication.getPrincipal();

        String token = tokenService.generateToken(authenticatedUser);

        return new UserLoginResponse("Bearer", token);

    }

}
