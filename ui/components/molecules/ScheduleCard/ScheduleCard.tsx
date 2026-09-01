"use client"
import { Schedule, ScheduleStatus } from "@/types"
import { Badge } from "../../atoms/Badge/Badge"
import { format } from "date-fns"
import { Briefcase, Clock10Icon, Clock12Icon, UserRoundIcon } from "lucide-react"

type Props = {
    data: Schedule
}

export function ScheduleCard({
    data
} : Props) {

    const statusMapper: Record<ScheduleStatus, string> = {
        Pending: "bg-pending/10 border-l-pending",
        Finished: "bg-finished/10 border-l-finished",
        Cancelled: "bg-destructive/10 border-l-destructive"
    }

    const startDateIso = new Date(data.dateonly + `T${data.start_time}`);
    const endDateIso = new Date(data.dateonly + `T${data.end_time}`);

    return(
        <div className={`w-full h-full min-h-0 rounded-lg border-l-6
        
        ` + statusMapper[data.status]}>
            <header className="w-full flex flex-wrap min-h-12 h-fit p-2 gap-2">
                <Badge
                className="h-8 px-2">
                    <p className="text-[10px]">{format(startDateIso, "HH:mm")} - {format(endDateIso, "HH:mm")}</p>
                </Badge>

                <Badge
                className="px-2"
                icon={
                    <UserRoundIcon size={10} strokeWidth={2.5} />
                }
                >
                    <div className="text-[10px]" title={data.customer.name}>{data.customer.name}</div>
                </Badge>

                <Badge
                variant="secondary"
                className="px-2"
                icon={
                    <Briefcase size={10} strokeWidth={2.5} />
                }
                >
                    <p className="text-[10px]" title={data.service.name}>{data.service.name}</p>
                </Badge>
            </header>
            <main className="w-full min-h-20 h-fit px-4">
                <p className="
                md:text-[10px]
                text-foreground/80" title={data.description}>{data.description}</p>
            </main>
        </div>
    );
}