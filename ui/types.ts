
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
    district: string
    number: string
    zipcode: string
}

export interface Establishment {
    id: string
    name: string
    slug: string // identificador humano único
    category: string
    address: Address
    email: string
    phone: string
    rating: number
}


export interface ProfessionalEstablishment {
    id: string
    fullName: string
    
}

export interface ServiceInput {
    professional_id: string
    name: string
    duration_minutes: number
    price: number
}

export interface Service {
    id: string
    establishment_id: string
    name: string
    duration_minutes: number
    price: number
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

export interface PatchScheduleInput { 
    id: string 

    customer_id?: string
    service_id?: string

    description?: string
    dateonly?: string
    start_time?: string
    end_time?: string
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

    description?: string
    dateonly: string
    start_time: string
    end_time: string

    status: ScheduleStatus
    created_at: string
}


export type DraftSchedule = Pick<ScheduleInput, "dateonly" | "start_time" | "end_time">;


export interface FilterSchedules {
    professional_id: string
    start_date?: string
    end_date?: string
}



