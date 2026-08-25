package com.unixforge.schedule_manager.modules.user.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDTO {

    @NotBlank(message = "Nome de usuário é obrigatório")
    @Size(min = 3, max = 50, message = "Nome de usuário deve ter entre 3 e 50 caracteres")
    private String username;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 200, message = "Nome deve ter entre 3 e 200 caracteres")
    private String name;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String email;
    
    @Pattern(regexp = "^(?:\\+?55\\s?)?(?:\\(?([1-9][1-9])\\)?\\s?)?(?:((?:9\\d|[2-9])\\d{3})\\s?-?\\s?(\\d{4}))$", message = "Telefone inválido")
    private String phone;

    @NotBlank(message = "Categoria é obrigatória")
    private String category;

    @NotBlank(message = "Endereço é obrigatório")
    @Valid
    private AddressDTO address;

}
