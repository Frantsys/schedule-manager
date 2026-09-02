package com.unixforge.schedule_manager.modules.user.dto;

import com.unixforge.schedule_manager.modules.user.entity.UserRole;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateDTO {

    @NotBlank(message = "Nome de usuário é obrigatório")
    @Size(min = 3, max = 50, message = "Nome de usuário deve ter entre 3 e 50 caracteres")
    private String username;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 200, message = "Nome deve ter entre 3 e 200 caracteres")
    private String name;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 8, max = 128, message = "Senha deve ter no mínimo 8 caracteres")
    private String password;
    
    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "^(?:\\+?55\\s?)?(?:\\(?([1-9][1-9])\\)?\\s?)?(?:((?:9\\d|[2-9])\\d{3})\\s?-?\\s?(\\d{4}))$", message = "Telefone inválido")
    private String phone;

    @NotBlank(message = "Categoria é obrigatória")
    private String category;

    @NotNull(message = "Endereço é obrigatório")
    @Valid
    private AddressDTO address;

    @NotNull(message = "Função é obrigatória")
    private UserRole role;

}
