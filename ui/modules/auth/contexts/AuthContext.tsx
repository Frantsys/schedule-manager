"use client"

import { api_url_public } from "@/enviroment";
import { UserCredentials } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    user: UserCredentials | null
    logout: () => void
}

const logoutRequest = async () => {
    await fetch(`${api_url_public}/auth/logout`, {
        method: "POST"
    });
}

const AuthContext = createContext<AuthContextType | null>(null);


    function AuthProvider({ children, initialUser }: { children: ReactNode, initialUser: UserCredentials | null }) {
    const [user, setUser] = useState<UserCredentials | null>(initialUser);


    const logout = async () => {
        await logoutRequest();
        setUser(null);
        window.location.href = "/login?reason=logout"
    }

    return (
        <AuthContext.Provider value={{ user, logout }} >
            {children}
        </AuthContext.Provider>
    );
} 


const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de componentes envolvidos em um AuthProvider.")
    }

    return context;
}


export { useAuth, AuthProvider }