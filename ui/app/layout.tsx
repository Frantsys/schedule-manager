import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "cn";
import { Toaster } from "@/components/ui/sonner";
import { NetworkStatus } from "@/shared/components/molecules/NetworkStatus";
import { AuthProvider } from "@/modules/auth/contexts/AuthContext";
import { cookies } from "next/headers";
import { api_url, GOOGLE_CLIENT_ID } from "@/enviroment";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserCredentials } from "@/modules/auth/types";

const manropeHeading = Manrope({ subsets: ['latin'], variable: '--font-heading' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: "Schedule"
};

// Nova função permissiva: Tenta pegar o usuário, mas NUNCA redireciona
async function getOptionalUser(): Promise<UserCredentials | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("AccessToken")?.value;

    if (!token) return null;

    try {
        const response = await fetch(`${api_url}/v1/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) return null;
        
        return await response.json() as UserCredentials;
    } catch {
        return null;
    }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await getOptionalUser();
  return (
    <html
      lang="pt-BR"
      className={cn(
        "min-h-screen antialiased",
        dmSans.variable,
        manropeHeading.variable
      )}
    >
      <body className="min-h-screen font-sans bg-background">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider initialUser={user}>
            <NetworkStatus />
              {children}
            <Toaster />
        </AuthProvider>
      </GoogleOAuthProvider>
      </body>
    </html>
  );
}