import z from "zod";

export const loginSchema = z.object({
  identifier: z.string()
              .nonempty("Identificador é obrigatório"),
  password: z.string()
              .nonempty("A senha é obrigatória")
});

export const signupSchema = z.object({
        name: z.string()
               .min(3, "O Nome deve conter 3 caracteres no mínimo.")
               .nonempty("O campo Nome é obrigatório")
               .nonoptional("O campo Nome é obrigatório"),
        email: z.email("Email inválido")
                .min(6, "O Email deve conter 6 caracteres no mínimo.")
                .nonempty("O campo Email é obrigatório")
                .nonoptional("O campo Email é obrigatório"),
        password: z.string()
                   .min(8, "A Senha deve conter 8 caracteres no mínimo.")
                   .nonempty("O campo Senha é obrigatório")
                   .nonoptional("O campo Senha é obrigatório"),
        confirmPassword: z.string()
                          .min(8, "A Confirmação da Senha deve conter 8 caracteres no mínimo.")
                          .nonempty("A Senha deve ser confirmada")
                          .nonoptional("A Senha deve ser confirmada"),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword", "password"]
    });
  }
});


const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;


