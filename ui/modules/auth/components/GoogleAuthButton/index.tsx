"use client";

import googleLogo from "@/public/official-Google-Logo-PNG-Image-1456013550.png"
import { useGoogleLogin } from '@react-oauth/google';
import { api_url_public } from '@/enviroment';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function GoogleLoginButton() {
  const login = useGoogleLogin({
    flow: 'auth-code', // Retorna o código de autorização em vez do token direto
    onSuccess: async (codeResponse) => {
      try {
        const res = await fetch(`${api_url_public}/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: codeResponse.code }),
        });

        if (res.ok) {
          window.location.href = "/dashboard";
        } else {
          console.error("Falha ao autenticar no backend");
        }
      } catch (error) {
        console.error("Erro na comunicação com o backend", error);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <Button
    onClick={() => login()}
    variant={"outline"} className={"text-xs rounded! p-4 w-full h-8 bg-white gap-4"}>
        <Image src={googleLogo} alt="google-logo" width={18} /> 
        Entrar com o Google
    </Button>
  );
}