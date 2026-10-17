import { api_url } from "@/enviroment";
import { UserCredentials } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react"



type AuthGuardProps = {
    allowedRoles?: string[]
    children: ReactNode
}

export async function AuthGuard({
    allowedRoles,
    children
}: AuthGuardProps) {

    const cookieStore = await cookies();
    const token = cookieStore.get("AccessToken")?.value;

    // Como o Next.js faz o cache da requisição (Fetch Memoization),
    // isso não gera custo de rede extra se o RootLayout já tiver chamado o /me.
    const response = await fetch(`${api_url}/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!response.ok) redirect("/login?reason=expired");
    
    const user = await response.json() as UserCredentials;

    if (!user) {
        redirect("/login?reason=unauthorized");
    }

    // Caso haja Roles especificos definidos
    if (allowedRoles) {
        const hasRole = user.roles.some(role => allowedRoles.includes(role));

        if (!hasRole) {
            redirect("/unauthorized");
        }
    }

    return children;
}