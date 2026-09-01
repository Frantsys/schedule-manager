"use client"

import { getPixelTop } from "../../lib/schedule-time"

type Props = {
    timeSlots: Array<string>
    totalHeight: number
    pixelsPerMinute: number
}

const TimeColumn = ({
    timeSlots,
    totalHeight,
    pixelsPerMinute
    
}: Props) => {
    return(
        <div className="relative" style={{ height: totalHeight }}>
            {timeSlots.map((slot) => {
                const top = getPixelTop(slot, timeSlots[0], pixelsPerMinute);
                return (
                <div
                    key={slot}
                    className="absolute w-full text-right pr-2 text-[10px] text-muted-foreground"
                    style={{
                    top,
                    transform: "translateY(-50%)",
                    }}
                >
                    {slot}
                </div>
                );
            })}
            </div>
    )
}

export default TimeColumn