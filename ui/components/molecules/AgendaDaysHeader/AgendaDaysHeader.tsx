'use client';

import { DayCardSelect } from '@/components/atoms/DayCardSelect/DayCardSelect';
import { Clock11 } from 'lucide-react';

type Props = {
  weekDays: Date[];
  selectedDate: Date;
  onDayClick: (date: Date) => void;
};

export function AgendaDaysHeader({ weekDays, selectedDate, onDayClick }: Props) {
    const today = new Date();



  return (
    <header className="w-full h-24 bg-primary flex flex-col">
        <section className='w-full h-1/2 flex '>
            
        </section>
        <section className='w-full h-1/2 flex justify-evenly px-2 gap-2'>
            <button className='w-64 h-10 text-background flex items-center justify-center
            hover:bg-background/10 rounded active:bg-background/25 transition-all duration-100
            '>
                <Clock11 size={20} />
            </button>
                  {
                  weekDays.map((day) => {
                    const dayNumber = day.getDate();
                    const dayShort = day.toLocaleDateString('pt-BR', { weekday: 'short' });
                    const isSelected = day.toDateString() === selectedDate.toDateString();
                    const isToday = day.toDateString() === today.toDateString();
                return (
                <DayCardSelect
                    key={day.toISOString()}
                    selected={isSelected}
                    selected2={isToday}
                    onClick={() => onDayClick(day)}
                >
                    <h2>{dayShort}</h2>
                    <h2>{dayNumber}</h2>
                </DayCardSelect>
                );
                  })
                  }
        </section>
    </header>
  );
}