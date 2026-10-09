"use client"

import { Loader2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef } from "react";

/**
 * 
 *  Página de redirecionamento
 *  
 * 
 * 
 */

const RedirectHandler = () => {

    const router = useRouter()
    const searchParams = useSearchParams();


    // useRef para evitar que o Strict Mode do React 18 dispare a requisição duas vezes
    const isProcessing = useRef(false)

    useEffect(() => {
        if (isProcessing.current) return
        isProcessing.current = true

        const code = searchParams.get("code")
        const fallbackErrorRoute = searchParams.get("error") || "signUp"

        async function handleOAuthCallback() {
            if (!code) {
                router.push(`/auth/${fallbackErrorRoute}?error=invalid_credentials`)
                return
            }

            try {
                // 1. Envia o código para o seu backend gerar a sessão/token
                const authResponse = await fetch("/api/auth/google/callback", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code })
                })

                if (!authResponse.ok) throw new Error("invalid_credentials")

                // 2. Busca os dados do usuário logo em seguida (/me)
                const meResponse = await fetch("/api/auth/me")
                
                if (!meResponse.ok) throw new Error("internal_error")

                // Sucesso! Redireciona para a Home pública
                router.push("/")
                
            } catch (error: any) {
                // Em caso de falha, redireciona para a página de erro correspondente
                const errorType = error.message || "internal_error"
                router.push(`/auth/${fallbackErrorRoute}?error=${errorType}`)
            }
        }

        handleOAuthCallback()
    }, [router, searchParams])

    return(
        <div className="w-full h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
            <Loader2Icon className="size-10 text-primary animate-spin" />
            <h1 className="font-heading font-semibold text-lg animate-pulse">
                Autenticando, aguarde...
            </h1>
        </div>
    )
}


export default function RedirectPage() {
    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center bg-background text-foreground">
                <Loader2Icon className="size-10 text-primary animate-spin" />
            </div>
        }>
            <RedirectHandler />
        </Suspense>
    )
}

