package com.unixforge.schedule_manager.modules.User.service;

import com.unixforge.schedule_manager.modules.User.dto.request.*;
import com.unixforge.schedule_manager.modules.User.dto.request.UserFilterRequest;
import com.unixforge.schedule_manager.modules.User.dto.response.UserResponse;
import com.unixforge.schedule_manager.modules.User.dto.response.UserSummaryResponse;
import com.unixforge.schedule_manager.modules.User.mapper.UserMapper;
import com.unixforge.schedule_manager.modules.User.model.User;
import com.unixforge.schedule_manager.modules.User.repository.UserRepository;
import com.unixforge.schedule_manager.modules.User.spec.UserSpec;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor  
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse updateById(Long id, UserUpdateRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));

        if (request.getFirstName() != null && !request.getFirstName().isBlank()) {
            user.setFirstName(request.getFirstName());
        }

        if (request.getLastname() != null && !request.getLastname().isBlank()) {
            user.setLastName(request.getLastname());
        }

        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }
        
        if (request.getAddress() != null) {
            user.setAddress(userMapper.toAddressEntity(request.getAddress()));
        }
        
        User updatedUser = userRepository.save(user);

        return userMapper.toResponse(updatedUser);
        
    }

    @Transactional(readOnly = true)
    public List<UserResponse> findAll() {

        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();

    }

    @Transactional(readOnly = true)
    public List<UserSummaryResponse> findAllSummary() {

        return userRepository.findAll()
            .stream()
            .map(userMapper::toSummaryResponse)
            .toList();

    }

    @Transactional(readOnly = true)
    public UserResponse findById(Long id) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));

        return userMapper.toResponse(user);

    }

    @Transactional()
    public void updatePassword(Long id, UserUpdatePasswordRequest request) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não foi encontrado com ID: " +  id));

        if(!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Senha atual incorreta");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);

    }

    @Transactional
    public UserResponse updateActivationById(Long id, UserUpdateActivationRequest request) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não foi encontrado com ID: " +  id));

        user.setIsActive(request.getIsActive());

        userRepository.save(user);

        return userMapper.toResponse(user);

    }

    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    @Transactional(readOnly = true)
    public List<UserResponse> filterUsers(UserFilterRequest request) {
        Specification<User> spec = Specification.unrestricted();

        if (request.name() != null && !request.name().isBlank()) {
            spec = spec.and(UserSpec.byName(request.name()));
        }

        if (request.role() != null) {
            spec = spec.and(UserSpec.byRole(request.role()));
        }

        if (request.roles() != null && !request.roles().isEmpty()) {
            spec = spec.and(UserSpec.byRoles(request.roles()));
        }

        if (request.category() != null && !request.category().isBlank()) {
            spec = spec.and(UserSpec.byCategory(request.category()));
        }

        if (request.isActive() != null) {
            spec = spec.and(UserSpec.byActivation(request.isActive()));
        }

        if (request.startDate() != null && request.endDate() != null) {
            spec = spec.and(UserSpec.byCreatedBetween(request.startDate(), request.endDate()));
        } else if (request.startDate() != null) {
            spec = spec.and(UserSpec.byCreatedAfter(request.startDate()));
        } else if (request.endDate() != null) {
            spec = spec.and(UserSpec.byCreatedBefore(request.endDate()));
        }

        return userRepository.findAll(spec)
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

}
