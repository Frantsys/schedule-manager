import { Customer, DraftSchedule, Schedule, ScheduleInput, ScheduleStatus, Service } from "@/types"
import ScheduleBlock from "../../molecules/ScheduleBlock/ScheduleBlock"
import { getPixelHeight, getPixelTop, pixelsToTime, roundToNextSlot, timeToMinutes } from "../../lib/schedule-time"
import useScheduleLayout from "../../hooks/useScheduleLayout"
import { MouseEvent, useState } from "react"
import { DraftScheduleBlock } from "../../molecules/DraftScheduleBlock/DraftScheduleBlock"

const DEFAULT_DURATION_MINUTES = 30;

type Props = {
    day: Date
    totalHeight: number
    totalSlots: number
    pixelsPerSlot: number
    pixelsPerMinute: number
    slots: string[]
    schedules: Schedule[]
    customers: Customer[]
    services: Service[]
    onCreateSchedule: (input: ScheduleInput) => Promise<Schedule>;
}

export function DayColumn({
    day,
    totalHeight,
    slots,
    pixelsPerSlot,
    pixelsPerMinute,
    customers,
    services,
    schedules,
    onCreateSchedule
}: Props) {

    const [draft, setDraft] = useState<DraftSchedule | null>(null);

    const result = useScheduleLayout({ config: {
        slotHeightPixels: pixelsPerSlot,
        startDayTime: slots[0],
        slots: slots,
        pixelsPerMinute
    }, schedules });



    const handleColumnClick = (event: MouseEvent<HTMLDivElement>, date: Date) => {
        if (draft) return;
        const containerRect = event.currentTarget.getBoundingClientRect();
        const clickY = event.clientY - containerRect.top;

        const rawTime = pixelsToTime(clickY, slots[0], pixelsPerMinute);
        const snappedStart = roundToNextSlot(rawTime);

        const startMinutes = timeToMinutes(snappedStart);
        const endMinutes = startMinutes + DEFAULT_DURATION_MINUTES;
        const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;

        const dateonly = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
        setDraft({ dateonly, start_time: snappedStart, end_time: endTime });
    };

    const handleConfirm = async (input: ScheduleInput) => {
        await onCreateSchedule(input);
        setDraft(null);
    };


    const draftTop = draft ? getPixelTop(draft.start_time, slots[0], pixelsPerMinute) : 0;
    const draftHeight = draft ? getPixelHeight(draft.start_time, draft.end_time, pixelsPerMinute) : 0;


    return(
        <div key={day.toDateString()} className="w-40 shrink-0">

            <header className="h-8 w-full bg-primary sticky top-0 z-10 flex items-center justify-center text-white text-xs">
              {day.toLocaleDateString("pt-BR", { weekday: "short" })}  {day.getDate()}
            </header>
            <div style={{ height: totalHeight }}
            onClick={(e) => handleColumnClick(e, day)}
            className="relative border-l">

                {slots.map((slot) => {
                    const top = getPixelTop(slot, slots[0], pixelsPerMinute);
                    return (
                        <div
                        key={slot}
                        className="absolute w-full border-b border-border/50"
                        style={{ top }}
                        />
                    );
                })}

              {
                result.map((r) => (
                    <ScheduleBlock 
                    key={r.schedule.toString()}
                    schecule={r.schedule}
                    height={r.height}
                    top={r.top}
                    />
                ))
              }

              {draft && (
                <DraftScheduleBlock
                top={draftTop}
                height={draftHeight}
                draft={draft}
                setDraft={setDraft}
                onCancel={() => setDraft(null)}
                onConfirm={handleConfirm}
                customers={customers}
                services={services}
                />
            )}

            </div>
          </div>
    )
}