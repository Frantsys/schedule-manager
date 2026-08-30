import { Schedule } from "@/types"
import { getPixelHeight, getPixelTop } from "../lib/schedule-time"

type Params = {
    schedules: Schedule[]
    config: {
        slotHeightPixels: number // Altura de cada slot em pixels
        startDayTime: string, // Horário em que o dia começa
        slots: string[], // Lista de Slots de Horários
        pixelsPerMinute: number // Quantidade de pixels calculados por minuto de slot de horário
    }

}

type ScheduleCardLayout = {
    schedule: Schedule; 
    top: number; 
    height: number; 
    left?: string; 
    width?: string
}

const useScheduleLayout = ({ schedules, config }: Params): ScheduleCardLayout[] => {

    return schedules.map<ScheduleCardLayout>((s) => {
        var top = getPixelTop(s.start_time, config.startDayTime, config.pixelsPerMinute);
        var height = getPixelHeight(s.start_time, s.end_time, config.pixelsPerMinute);

        console.log("hook logging, useScheduleLayout top: " + top);
        
        return {
            schedule: s,
            top: top,
            height: height
        }
    });
}

export default useScheduleLayout;
