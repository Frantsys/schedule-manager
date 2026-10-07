"use server"
import z from "zod";
import { ActionState } from "../types";
import { LoginInput } from "../../types";
import { api_url } from "@/enviroment";
import { loginSchema } from "../schemas";


export const loginRequest = async (body: LoginInput) => {

    try {
        console.log("Iniciando request")

        const response = await fetch(`${api_url}/v1/api/auth/login`, {
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

      if (response.status == 401) {
        return {
            success: false,
            message: errorMessage || "Credenciais inválidas."
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


export async function loginAction(
    prevState: ActionState<null>,
    formData: FormData
): Promise<ActionState<null>>{
  const data = Object.fromEntries(formData);
  const parsed = loginSchema.safeParse(data);

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

  const state = await loginRequest(parsed.data);
  console.log("Estado teste:  " + state.message);
  
  return state;
}
