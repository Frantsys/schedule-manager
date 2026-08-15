'use client';

import { ScheduleCard } from '@/components/molecules/ScheduleCard/ScheduleCard';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Schedule } from '@/types';

type SchedulesColumnProps = {
  date: Date;
  schedules: Schedule[];
  timeSlots: string[];
  isSelected?: boolean;
};


function getSlotIndex(time: string, timeSlots: string[]): number {
  return timeSlots.indexOf(time);
}

function getDurationInHours(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return (eh - sh) + (em - sm) / 60;
}

export function SchedulesColumn({
  date,
  schedules,
  timeSlots,
  isSelected,
}: SchedulesColumnProps) {
  const daySchedules = schedules.filter(
    (s) => new Date(s.dateonly).toDateString() === date.toDateString()
  );

  const sorted = daySchedules.sort((a, b) =>
    a.start_time.localeCompare(b.start_time)
  );

  return (
    <div
      className={`flex-1 min-w-30 border-r ${
        isSelected ? 'bg-accent/5' : ''
      }`}
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${timeSlots.length}, 4rem)`, // cada slot com 4rem (h-16)
        gridAutoFlow: 'row dense',
        height: `${timeSlots.length * 4}rem`,
      }}
    >

      {timeSlots.map((slot) => (
        <div
          key={slot}
          style={{ gridRow: `${timeSlots.indexOf(slot) + 1} / span 1` }}
        />
      ))}


      {sorted.map((schedule) => {

        const startIdx = getSlotIndex(schedule.start_time.slice(0, 5), timeSlots);
        const endIdx = getSlotIndex(schedule.end_time.slice(0, 5), timeSlots);
        

        const effectiveEndIdx = endIdx !== -1 ? endIdx : timeSlots.length;
        const slotSpan = effectiveEndIdx - startIdx;

        return (
          <HoverCard key={date.toDateString()}>
            <HoverCardTrigger delay={500} closeDelay={100} render={
              <div
              key={schedule.id}
              style={{
                gridRow: `${startIdx + 1} / span ${slotSpan}`,
            
                overflow: 'visible',
              }}
              className="p-0.5"
            >
              <ScheduleCard data={schedule} />
            </div>
            } />
            <HoverCardContent className={"w-lg min-h-48 h-fit bg-background p-4"}>
                <header className='w-full h-16 border'>

                </header>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}