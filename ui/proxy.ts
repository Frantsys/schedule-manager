import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { api_url } from "@/enviroment";


// Validação local de token
// Presume-se que o modelo de token é JWT
function isTokenExpired(token: string) {
    try {
        const payloadBase64 = token.split('.')[1];
        // atob() decodifica Base64 nativamente no Edge Runtime
        const decodedJson = atob(payloadBase64);
        const payload = JSON.parse(decodedJson);
        
        // Retorna true se expirar em menos de 60 segundos
        return payload.exp < Math.floor(Date.now() / 1000) + 60;
    } catch {
        return true; // Na dúvida (token malformado), considera expirado
    }
}

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("AccessToken")?.value;
    const refreshToken = request.cookies.get("RefreshToken")?.value;

    const redirectToLogin = (reason: string) => {
        const url = new URL("/login", request.url);
        url.searchParams.set("reason", reason);
        url.searchParams.set("next", request.nextUrl.pathname);
        const res = NextResponse.redirect(url);
        res.cookies.delete("AccessToken");
        res.cookies.delete("RefreshToken");
        return res;
    };

    if (!accessToken && !refreshToken) return redirectToLogin("unauthorized");

    if (accessToken && !isTokenExpired(accessToken)) {
        return NextResponse.next();
    }

    if (!refreshToken) return redirectToLogin("expired");

    // Tentativa de Refresh
    const refreshRes = await fetch(`${api_url}/v1/auth/refresh`, {
        method: "POST",
        headers: { "Cookie": request.headers.get("cookie") || "" }
    });

    if (!refreshRes.ok) return redirectToLogin("expired");

    const response = NextResponse.next();
    const backendCookies = refreshRes.headers.getSetCookie();
    backendCookies.forEach(cookie => response.headers.append("Set-Cookie", cookie));

    return response;
}

export const config = { matcher: ['/core/:path*', '/customer/:path*'] }