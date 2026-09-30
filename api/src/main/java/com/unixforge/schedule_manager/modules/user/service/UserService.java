package com.unixforge.schedule_manager.modules.user.service;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unixforge.schedule_manager.modules.user.dto.request.UserCreateRequest;
import com.unixforge.schedule_manager.modules.user.dto.request.UserUpdateActivationRequest;
import com.unixforge.schedule_manager.modules.user.dto.request.UserUpdatePasswordRequest;
import com.unixforge.schedule_manager.modules.user.dto.request.UserUpdateRequest;
import com.unixforge.schedule_manager.modules.user.dto.response.UserFilterResponse;
import com.unixforge.schedule_manager.modules.user.dto.response.UserResponse;
import com.unixforge.schedule_manager.modules.user.entity.User;
import com.unixforge.schedule_manager.modules.user.mapper.UserMapper;
import com.unixforge.schedule_manager.modules.user.repository.UserRepository;
import com.unixforge.schedule_manager.modules.user.specification.UserSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    
    @Transactional
    public UserResponse createUser(UserCreateRequest requestDTO) {
        
        User user = userMapper.toEntity(requestDTO);
        
        user.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
        user.setIsActive(true);

        User savedUser = userRepository.save(user);
        
        return userMapper.toDTO(savedUser);

    }

    @Transactional(readOnly = true)
    public UserResponse findById(Long id) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID " + id));

        return userMapper.toDTO(user);

    }

    @Transactional(readOnly = true)
    public List<UserResponse> findAll() {
        return userRepository.findAll()
            .stream()
            .map(userMapper::toDTO)
            .toList();
    }

    @Transactional
    public UserResponse updateById(Long id, UserUpdateRequest requestDTO) {

        User oldUser = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID " + id));


        userMapper.updateEntityFromDTO(requestDTO, oldUser); 

        User updatedUser = userRepository.save(oldUser);

        return userMapper.toDTO(updatedUser);

    }

    @Transactional
    public void changePassword(Long id, UserUpdatePasswordRequest requestDTO) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não foi encontrado com ID " +  id));

        if(!passwordEncoder.matches(requestDTO.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Senha atual incorreta");
        }

        user.setPassword(passwordEncoder.encode(requestDTO.getNewPassword()));;

        userRepository.save(user);

    }

    @Transactional
    public UserResponse updateActivationById(Long id, UserUpdateActivationRequest requestDTO) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não foi encontrado com ID " +  id));

        user.setIsActive(requestDTO.getIsActive());

        userRepository.save(user);

        return userMapper.toDTO(user);

    }

    @Transactional(readOnly = true)
    public List<UserResponse> listUsers(UserFilterResponse requestDTO) {
        Specification<User> spec = Specification.unrestricted();

        if(requestDTO.name() != null) {
            spec = spec.and(UserSpecification.byName(requestDTO.name()));
        }

        if(requestDTO.role() != null) {
            spec = spec.and(UserSpecification.byRole(requestDTO.role()));
        }

        if(requestDTO.roles() != null && !requestDTO.roles().isEmpty()) {
            spec = spec.and(UserSpecification.byRoles(requestDTO.roles()));
        }

        if(requestDTO.category() != null && requestDTO.category().isBlank()) {
            spec = spec.and(UserSpecification.byCategory(requestDTO.category()));
        }

        if(requestDTO.isActive() != null) {
            spec = spec.and(UserSpecification.byActivation(requestDTO.isActive()));
        }

        if(requestDTO.startDate() != null && requestDTO.endDate() == null) {
            spec = spec.and(UserSpecification.byCreatedAfter(requestDTO.startDate()));
        }

        if(requestDTO.startDate() == null && requestDTO.endDate() != null) {
            spec = spec.and(UserSpecification.byCreatedBefore(requestDTO.endDate()));
        }

        if(requestDTO.startDate() != null && requestDTO.endDate() != null) {
            spec = spec.and(UserSpecification.byCreatedBetween(requestDTO.startDate(), requestDTO.endDate()));
        }

        return userRepository.findAll(spec)
            .stream()
            .map(userMapper::toDTO)
            .toList();
    }

}
