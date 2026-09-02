package com.unixforge.schedule_manager.modules.user.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unixforge.schedule_manager.modules.user.dto.UserActivationDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserCreateDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserResponseDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserUpdateDTO;
import com.unixforge.schedule_manager.modules.user.dto.UserUpdatePasswordDTO;
import com.unixforge.schedule_manager.modules.user.entity.User;
import com.unixforge.schedule_manager.modules.user.mapper.UserMapper;
import com.unixforge.schedule_manager.modules.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    
    @Transactional
    public UserResponseDTO createUser(UserCreateDTO requestDTO) {
        
        User user = userMapper.toEntity(requestDTO);
        
        user.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
        user.setIsActive(true);

        User savedUser = userRepository.save(user);
        
        return userMapper.toDTO(savedUser);

    }

    @Transactional(readOnly = true)
    public UserResponseDTO findById(Long id) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID " + id));

        return userMapper.toDTO(user);

    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> findAll() {
        return userRepository.findAll()
            .stream()
            .map(userMapper::toDTO)
            .toList();
    }

    @Transactional
    public UserResponseDTO updateById(Long id, UserUpdateDTO requestDTO) {

        User oldUser = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID " + id));


        userMapper.updateEntityFromDTO(requestDTO, oldUser); 

        User updatedUser = userRepository.save(oldUser);

        return userMapper.toDTO(updatedUser);

    }

    @Transactional
    public void changePassword(Long id, UserUpdatePasswordDTO requestDTO) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não foi encontrado com ID " +  id));

        if(!passwordEncoder.matches(requestDTO.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Senha atual incorreta");
        }

        user.setPassword(passwordEncoder.encode(requestDTO.getNewPassword()));;

        userRepository.save(user);

    }

    @Transactional
    public UserResponseDTO updateActivationById(Long id, UserActivationDTO requestDTO) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não foi encontrado com ID " +  id));

        user.setIsActive(requestDTO.getIsActive());

        userRepository.save(user);

        return userMapper.toDTO(user);

    }

}
