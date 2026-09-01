"use client"
import { useEffect, useState } from "react"
import TimeColumn from "./molecules/TimeColumn/TimeColumn"
import ScheduleBlock from "./molecules/ScheduleBlock/ScheduleBlock"
import { Customer, Schedule, ScheduleInput, ScheduleStatus, Service } from "@/types"
import { getPixelHeight, getPixelTop } from "./lib/schedule-time"
import { DayColumn } from "./organisms/DayColumn/DayColumn"
import { createSchedule } from "@/services/schedules/schedules-server"

type SlotsPixel = {
  slots: string[]
  pixelsPerSlot: number
}

 


const generateSlots = (startHour: number, endHour: number, intervalMinutes: number) => {
  const slots: string[] = [];
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += intervalMinutes) {
      const hourStr = String(h).padStart(2, '0');
      const minStr = String(m).padStart(2, '0');
      slots.push(`${hourStr}:${minStr}`);
    }
  }
  return slots;
};

type SchedulesDate = {
    date: Date
    schedules: Schedule[]
}

type Props = {
  initialSchedules: Schedule[]
  customers: Customer[]
  services: Service[]
}

const START_HOUR = 6;
const END_HOUR = 19;
const MINUTE_INTERVAL = 60
const PIXELS_PER_SLOT = MINUTE_INTERVAL


export function BlockAgenda({
  initialSchedules,
  customers,
  services
}: Props) {

    const [weekDays, setWeekDays] = useState<Date[]>([]);
    const [weekdaySchedules, setWeekDaySchedules] = useState<SchedulesDate[]>([])
    const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);

    const handleCreateSchedule = async (input: ScheduleInput): Promise<Schedule> => {
      const created = await createSchedule(input);
      setSchedules((prev) => [...prev, created]);
      return created;
    };

    const [slots] = useState<SlotsPixel>({
        slots: generateSlots(START_HOUR, END_HOUR, MINUTE_INTERVAL),
        pixelsPerSlot: PIXELS_PER_SLOT
    });

    const totalHeight = slots.slots.length * slots.pixelsPerSlot;
    const pixelsPerMinute = ((PIXELS_PER_SLOT) / (MINUTE_INTERVAL))

    const filterSchedulesByDateRange = (
        startDate: Date,
        endDate: Date,
        schedules: Schedule[]
      ): SchedulesDate[] => {
        const result: SchedulesDate[] = [];

        
        const current = new Date(startDate);
        current.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);


        while (current <= end) {
          const day = new Date(current);
          const daySchedules = schedules.filter((s) => {

            const [y, m, d] = s.dateonly.split('-').map(Number);
            const sDate = new Date(y, m - 1, d); 

            return (
              sDate.getFullYear() === day.getFullYear() &&
              sDate.getMonth() === day.getMonth() &&
              sDate.getDate() === day.getDate()
            );
          });
          console.log("Logging: daySchedules - " + daySchedules);
          

          result.push({ date: day, schedules: daySchedules });
          current.setDate(current.getDate() + 1);
        }

        console.log("Teste");
        return result;
      }

    useEffect(()=> {
        console.log(new Date().toLocaleDateString());
    }, [])

    const setupSevenDays = () => {
        const today = new Date();
        const currentDay = today.getDay();
        const sunday = new Date(today);
        sunday.setDate(today.getDate() - currentDay);

        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {

          const d = new Date(sunday);
          d.setDate(sunday.getDate() + i);
          days.push(d);

        }

        setWeekDays(days);
    };

    useEffect(() => {
        setupSevenDays();
        
    }, []); 

    useEffect(() => {
      setWeekDaySchedules(filterSchedulesByDateRange(weekDays[0], weekDays[6], schedules));
      console.log(weekdaySchedules);
    }, [weekDays]);

    
  return (

    <div className="w-full h-full overflow-auto overscroll-none">
      <div className="flex" style={{ width: "max-content", minWidth: "100%" }}>


        <aside className="w-16 shrink-0 sticky left-0 z-20 bg-background">
          
          <header className="h-8 w-full bg-primary sticky top-0 z-30" />
          <TimeColumn
          timeSlots={slots.slots} 
          pixelsPerMinute={pixelsPerMinute}
          totalHeight={totalHeight}
          />
        </aside>

        {
          weekdaySchedules.map((d) => (
            <DayColumn 
            customers={customers}
            services={services}
            key={d.date.toDateString()}
            onCreateSchedule={handleCreateSchedule}
            day={d.date} 
            slots={slots.slots} 
            totalHeight={totalHeight} 
            pixelsPerSlot={slots.pixelsPerSlot}
            pixelsPerMinute={pixelsPerMinute}
            totalSlots={slots.slots.length} 
            schedules={d.schedules} />
          ))
        }
      </div>
    </div>
  );
}