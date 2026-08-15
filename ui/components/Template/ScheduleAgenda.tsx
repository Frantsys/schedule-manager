"use client"

import { ScheduleStatus } from "@/types";
import { BlockAgenda } from "../organism/BlockAgenda/BlockAgenda";
import { CustomersCalendar } from "../organism/CustomersCalendar/CustomersCalendar";


export function ScheduleAgenda() {


    return(
        <main className="w-full h-full flex flex-col ">
            <section className="w-full h-2/12 ">
            
            </section>
            <section className="w-full h-10/12 flex">
                {/* <section className="w-3/16 h-full border">
                    
                </section> */}
                
                <BlockAgenda
                initialSchedules={[
                    {
                        id: "sched-001",
                        customer: {
                            id: "cust-001",
                            name: "Ana Silva",
                            email: "ana.silva@email.com",
                            phone: "(11) 98765-4321"
                        },
                        service: {
                            id: "serv-001",
                            name: "Corte de Cabelo e Barba",
                            duration_minutes: 45,
                            price_minute: 1.5 // R$ 67,50 total
                        },
                        description: "Cliente solicitou atendimento no primeiro horário do dia.",
                        dateonly: "2026-08-13",
                        start_time: "09:00",
                        end_time: "12:45",
                        status: ScheduleStatus.PENDING,
                        created_at: "2026-08-15T14:30:00Z"

                    }
                ]}
                />
            </section>
        </main>
    )
}