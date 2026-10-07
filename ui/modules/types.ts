
export interface Address {
    city: string
    state: string
    country: string
    street: string
    district: string
    number: string
    zipcode: string
}

export interface CustomerScheduleDTO {
    id: string
    establishmentId: string
    serviceId: string
    professionalId: string
    dateonly: string
    startTime: string
    endTime: string
}

export interface ServiceDTO {
    id: string
    name: string
    description?: string
    duration_minutes: number
    price?: number
    under_consult: boolean
    is_active: boolean
}

export interface EstablishmentSearchResultDTO {
    displayName: string
    slug: string
    address: Address,
    rating: number
    proximity: number
}
