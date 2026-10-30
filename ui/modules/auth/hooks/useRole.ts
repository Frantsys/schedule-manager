import { useAuth } from "../contexts/AuthContext";


export function useRole() {
    const { user } = useAuth();

    const hasRole = (allowedRoles: string[]) => {
        if (!user) return false;
        return user.roles.some(role => allowedRoles.includes(role));
    };

    return { hasRole, user };
}