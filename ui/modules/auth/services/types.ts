
export type ActionState<T> = {
    success: boolean
    errors?: Record<string, string[]>
    message?: string
    data?: T
}
