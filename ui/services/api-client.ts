
export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL; 

    const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    return response.json();
}
