import { Badge } from "@/components/atoms/Badge/Badge";
import { DayCardSelect } from "@/components/atoms/DayCardSelect/DayCardSelect";
import { AgendaDaysHeader } from "@/components/molecules/AgendaDaysHeader/AgendaDaysHeader";
import { CustomersCalendarCard } from "@/components/molecules/CustomerCalendarCard/CustomerCalendarCard";
import { ScheduleCard } from "@/components/molecules/ScheduleCard/ScheduleCard";
import { SidebarButton } from "@/components/molecules/SidebarButton/SidebarButton";
import { BlockAgenda } from "@/components/organism/BlockAgenda/BlockAgenda";
import { CustomersCalendar } from "@/components/organism/CustomersCalendar/CustomersCalendar";
import { ScheduleStatus } from "@/types";
import { log } from "console";
import { Calendar, Clock1, Clock10, UsersRoundIcon } from "lucide-react";

export default function DesignSystem() {


    const onClickDate = async (d: Date) => {
        "use server"
        console.log(d);
        
    }

    return(
        <div className="w-full h-screen p-10"> 
            {/* Átomos */}
            <section className="w-full h-full flex items-center px-12">
                <section className="w-24 h-2/3 border rounded">
                    <Badge 
                    variant="cancelled"
                    icon={
                        <Clock10 size={16} strokeWidth={2.5} />
                    }>
                        <span>Tester</span>
                    </Badge>
                </section>
            </section>

                    {/* Moléculas */}
            <section className="w-full h-full flex items-center px-12">
                    <section className="w-1/3 h-24 border rounded bg-primary flex">
                        <DayCardSelect
                            selected={true}
                        >
                            <h2 className="text-white font-medium">Seg</h2>
                            <h2 className="text-white font-medium">10</h2>
                        </DayCardSelect>
                        <DayCardSelect
                            selected2
                        >
                            <h2 className="text-white font-medium">Seg</h2>
                            <h2 className="text-white font-medium">10</h2>
                        </DayCardSelect>
                        <DayCardSelect
                            
                        >
                            <h2 className="text-white font-medium">Seg</h2>
                            <h2 className="text-white font-medium">10</h2>
                        </DayCardSelect>
                    </section>

                    <section className="ml-20 border w-2/10 h-2/3 space-y-2 p-4">
                        <SidebarButton
                        icon={
                            <Calendar size={18} strokeWidth={2.5}/>
                        }
                        selected
                        >
                            <span>Agenda</span>
                        </SidebarButton>

                        <SidebarButton
                        icon={
                            <UsersRoundIcon size={18} strokeWidth={2.5}/>
                        }
                        
                        >
                            <span>Clientes</span>
                        </SidebarButton>
                    </section>

                    <section className="w-2/4 h-full space-y-4">
                            <ScheduleCard
                            data={
                                {
                                    id: "t123",
                                    description: "Consulta dentária",
                                    dateonly: "2026-08-14",
                                    start_time: "T14:30:00",
                                    end_time: "T15:30:00",
                                    created_at: "2026-08-09T14:30:00",
                                    status: ScheduleStatus.PENDING,
                                    customer: {
                                        id: "c1",
                                        name: "Humberto Vieira",
                                        email: "hb@hotmail.com",
                                        phone: "+55 87 9018-0001"
                                    },
                                    service: {
                                        id: "s2",
                                        name: "Consulta",
                                        duration_minutes: 50,
                                        price_minute: 3.50
                                    }
                                }
                            }
                            />

                            <ScheduleCard
                            data={
                                {
                                    id: "t123",
                                    description: "Consulta dentária",
                                    dateonly: "2026-08-14",
                                    start_time: "T14:30:00",
                                    end_time: "T15:30:00",
                                    created_at: "2026-08-09T14:30:00",
                                    status: ScheduleStatus.FINISHED,
                                    customer: {
                                        id: "c1",
                                        name: "Humberto Vieira",
                                        email: "hb@hotmail.com",
                                        phone: "+55 87 9018-0001"
                                    },
                                    service: {
                                        id: "s2",
                                        name: "Consulta",
                                        duration_minutes: 50,
                                        price_minute: 3.50
                                    }
                                }
                            }
                            />

                            <ScheduleCard
                            data={
                                {
                                    id: "t123",
                                    description: "Consulta dentária",
                                    dateonly: "2026-08-14",
                                    start_time: "T14:30:00",
                                    end_time: "T15:30:00",
                                    created_at: "2026-08-09T14:30:00",
                                    status: ScheduleStatus.CANCELLED,
                                    customer: {
                                        id: "c1",
                                        name: "Humberto Vieira de Sousa Marques Trajano SIlva",
                                        email: "hb@hotmail.com",
                                        phone: "+55 87 9018-0001"
                                    },
                                    service: {
                                        id: "s2",
                                        name: "Consulta",
                                        duration_minutes: 50,
                                        price_minute: 3.50
                                    }
                                }
                            }
                            />
                    </section>

            </section>

            <section className="w-full h-full border border-black">
                    <AgendaDaysHeader
                        onDayClick={async () => {
                            "use server"
                        }}
                        selectedDate={new Date()}
                        weekDays={[]}
                    />
            </section>

            <section className="w-full h-full border mt-10">
                    <article className="w-1/2 h-full p-2">
                        <CustomersCalendarCard />
                    </article>
            </section>

            {/* Organisms */}
            <section className="w-full h-full p-4">
                    <section className="w-full h-full border rounded">
                        <BlockAgenda />
                    </section>
            </section>
        </div>
    );
}