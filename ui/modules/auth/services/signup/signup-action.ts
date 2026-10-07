import { api_url } from "@/enviroment";
import { SignUpInput } from "../../types";
import z from "@/node_modules/zod/v4/classic/external.cjs";
import { signupSchema } from "../schemas";
import { ActionState } from "../types";


export const signUpRequest = async (body: SignUpInput) => {
    try {
        const response = await fetch(`${api_url}/v1/api/auth/signup`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        return {
            success: true
        }
      }

      const errorMessage = await response.text();
      console.log(errorMessage)

      if (response.status == 400) {
        return {
            success: false,
            message: errorMessage || "Credenciais inválidas."
        }
      }

      if (response.status == 401) {
        return {
            success: false,
            message: errorMessage || "Acesso não autorizado."
        }
      }

      return {
        success: false,
        message: errorMessage || "Erro interno do servidor. Tente mais tarde."
      };
    }
    catch(error) {
        return {
            success: false,
            message: "Não foi possível conectar ao servidor."
        }
    }
}



export async function signUpAction(
  prevState: ActionState<null>,
  formData: FormData
): Promise<ActionState<null>> {
  const data = Object.fromEntries(formData);
  const parsed = signupSchema.safeParse(data);

  if (!parsed.success) {
    const properties = z.treeifyError(parsed.error).properties;
    
    const formattedErrors: Record<string, string[]> = {};

    if (properties) {
      for (const [key, value] of Object.entries(properties)) {
        if (value?.errors && value.errors.length > 0) {
          formattedErrors[key] = value.errors;
        }
      }
    }

    return {
      success: false,
      errors: formattedErrors,
      message: 'Dados inválidos.',
    };
  }

  return await signUpRequest({ 
    email: parsed.data.email,
    password: parsed.data.password
  });
}
