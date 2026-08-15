
export enum ScheduleStatus {
    PENDING = "Pending",
    FINISHED = "Finished",
    CANCELLED = "Cancelled"
}

export interface Address {
    city: string
    state: string
    country: string
    street: string
    neighborhood: string
    number: string
}

export interface Professional {
    id: string
    name: string
    category: string
    address: Address
    email: string
    phone: string
}

export interface ServiceInput {
    professional_id: string
    name: string
    duration_minutes: number
    price_minute: number
}
    
export interface Service {
    id: string
    name: string
    duration_minutes: number
    price_minute: number
}

export interface CustomerInput {
    name: string
    email: string
    phone: string
}

export interface Customer {
    id: string
    name: string
    email: string
    phone: string
}

export interface ScheduleInput {
    customer_id: string
    service_id: string

    description: string
    dateonly: string
    start_time: string
    end_time: string

}

export interface Schedule {
    id: string

    customer: Customer
    service: Service

    description: string
    dateonly: string
    start_time: string
    end_time: string

    status: ScheduleStatus
    created_at: string
}
