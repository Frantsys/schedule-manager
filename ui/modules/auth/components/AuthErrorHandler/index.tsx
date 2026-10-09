"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { toast } from "sonner" // Ajuste o import

const ERROR_MESSAGES: Record<string, string> = {
    invalid_credentials: "As credenciais fornecidas pelo provedor são inválidas ou expiraram.",
    internal_error: "Ocorreu um erro interno no servidor. Tente novamente.",
    unavailable: "O serviço de autenticação está temporariamente indisponível.",
}

export function AuthErrorHandler() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const errorType = searchParams.get("error")

        if (errorType && ERROR_MESSAGES[errorType]) {
            toast("Falha na Autenticação", {
                description: () => (
                    <span className="text-[#1E293B]">{ERROR_MESSAGES[errorType]}</span>
                ),
                duration: 5000,
                className: "bg-red-200! border-red-400!",
                classNames: {
                    title: "text-red-700!"
                },
            })

            const params = new URLSearchParams(searchParams.toString())
            params.delete("error")
            router.replace(`${pathname}?${params.toString()}`)
        }
    }, [searchParams, router, pathname])

    return null
}