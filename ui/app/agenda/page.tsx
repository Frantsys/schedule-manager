import { BlockAgenda } from "@/components/organism/BlockAgenda/BlockAgenda";
import { ScheduleAgenda } from "@/components/Template/ScheduleAgenda";
import { ScheduleStatus } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};


export default function Agenda() {

    // Requisição dos Schedules


    return(
        <main className="w-full h-full">
                <BlockAgenda initialSchedules={[
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
                            price_minute: 1.5 
                        },
                        description: "Cliente solicitou atendimento no primeiro horário do dia.",
                        dateonly: "2026-08-27",
                        start_time: "09:00",
                        end_time: "12:45",
                        status: ScheduleStatus.PENDING,
                        created_at: "2026-08-15T14:30:00Z"

                    }
                ]}
                customers={[
                    {
                        id: "c-12",
                        name: "Kaio Gedean",
                        email: "k@email.com",
                        phone: "kkk"
                    },
                    {
                        id: "c-14",
                        name: "Marina Gedean",
                        email: "k@email.com",
                        phone: "kkk"
                    },
                    {
                        id: "c-189",
                        name: "Otavio Gedean",
                        email: "k@email.com",
                        phone: "kkk"
                    }
                ]}
                services={[
                    {
                        id: "sv-001",
                        name: "Corte de cabelo",
                        duration_minutes: 20,
                        price_minute: 3.40
                    }
                ]}
                />
        </main>
    );
}