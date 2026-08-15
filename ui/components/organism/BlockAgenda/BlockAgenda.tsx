'use client';

import { AgendaDaysHeader } from '@/components/molecules/AgendaDaysHeader/AgendaDaysHeader';
import { SchedulesColumn } from '@/components/molecules/SchedulesColumn/SchedulesColumn';
import { Schedule } from '@/types';
import { useState, useEffect } from 'react';

type BlockAgendaProps = {
  initialSchedules?: Schedule[];
};

export function BlockAgenda({ initialSchedules = [] }: BlockAgendaProps) {
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [daysCount, setDaysCount] = useState(5);
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [timeSlots, setTimeSlots] = useState<string[]>([
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ]);


  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const days: Date[] = [];
    for (let i = 0; i < daysCount; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d);
    }
    setWeekDays(days);

  }, []);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };



  return (
    <div className="w-full h-full flex flex-col">
      <AgendaDaysHeader
        weekDays={weekDays}
        selectedDate={selectedDate}
        onDayClick={handleDayClick}
      />

      
      <div className="flex flex-1 overflow-x-auto">
        
        <div className="flex flex-col border-r bg-muted/30 min-w-15 h-fit">
          {timeSlots.map((slot) => (
            <div
              key={slot}
              className={` 
                h-16
                flex items-center justify-center text-xs font-medium text-muted-foreground border-b`}
            >
              {slot}
            </div>
          ))}
        </div>
        
        {weekDays.map((day) => (
          <SchedulesColumn
            key={day.toISOString()}
            date={day}
            schedules={schedules}
            timeSlots={timeSlots}
            isSelected={day.toDateString() === selectedDate.toDateString()}
          />
        ))}
      </div>
    </div>
  );
}