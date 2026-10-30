import { Address } from "@/types"


export interface LoginInput {
    identifier: string
    password: string
}

export interface SignUpInput {
    email: string
    password: string
}

export interface CustomerSignInInput {
    name: string
    email: string
    phone: string
    password: string
}

export interface GoogleAuthRequest {
    redirectUri: string
}

export interface ProfessionalSignInInput {
    name: string
    email: string
    phone: string
    password: string
    category: string
    address: Address
}


export enum Provider {
    Local = "LOCAL",
    Google = "GOOGLE"
}


export interface UserCredentials {
    username: string
    email: string
    provider: Provider
    roles: string[]
    lastLoggedIn: string
}