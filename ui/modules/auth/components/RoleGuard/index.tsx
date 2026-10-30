// components/RoleGuard.tsx
"use client";

import { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface RoleGuardProps {
    allowedRoles: string[];
    children: ReactNode;
    fallback?: ReactNode; // fallback, aparece caso não esteja disponível
}

export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
    const { user } = useAuth();

    // Se o usuário não estiver logado, não renderiza
    if (!user) {
        return <>{fallback ?? null}</>;
    }

    // Verifica se há intersecção entre os cargos do usuário e os cargos permitidos
    const hasPermission = user.roles.some((role) => allowedRoles.includes(role));

    if (!hasPermission) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}