import { Schedule } from "@/types";

export type ScheduleColumn = { 
    schedule: Schedule; column: number; totalColumns: number 
}


/**
 *  Calcula o total de minutos tempo em string
 * 
 * @remarks
 * Esse método faz parte do core do BlockAgenda
 *  
 * @param time - Tempo em string Ex.: "09:15"
 * 
 * @returns Total de minutos calculado
 * 
 * @v1
 */
export const timeToMinutes = (time: string): number => {

    let [hour, minute] = time.split(":");

    console.log(Number(hour))
    console.log(Number(minute));

    return (Number(hour)*60) + Number(minute);
}


/**
 *  Calcula a distância de pixels do topo
 * 
 * @remarks
 * Esse método faz parte do core do BlockAgenda
 *  
 * @param startTime - Tempo de início do Schedule
 * @param dayStartTime - Hora considerada o Início
 * @param pixelsPerMinute - Quantidade de pixels definida por slot de minuto
 * 
 * @returns Distância do topo em pixels
 * 
 * @v1
 */
export const getPixelTop = (startTime: string, dayStartTime: string, pixelsPerMinute: number): number => {
    var startTimeMinutes = timeToMinutes(startTime);
    var dayStartMinutes = timeToMinutes(dayStartTime);

    return (startTimeMinutes - dayStartMinutes) * pixelsPerMinute;
}


/**
 *  Calcula a altura do card em pixels
 * 
 * @remarks
 * Esse método faz parte do core do BlockAgenda
 * 
 * @param startTime - Tempo de início do Schedule
 * @param endTime - Tempo final do Schedule
 * @param pixelsPerMinute - Quantidade de pixels definida por slot de minuto
 * 
 * @description - Multiplica a soma dos minutos do tempo de início e minutos do tempo final com os pixels
 * definidos por slot de minuto
 * 
 * @returns Altura definida em pixels
 * 
 * @v1
 */
export const getPixelHeight = (
    startTime: string, 
    endTime: string, 
    pixelsPerMinute: number
): number => {
    var startTimeMinutes = timeToMinutes(startTime);
    var endTimeMinutes = timeToMinutes(endTime);

    return (endTimeMinutes - startTimeMinutes) * pixelsPerMinute;
}

/**
 *  Arredonda um horário para o múltiplo de 5 minutos mais próximo.
 *
 * @remarks
 * Esse método faz parte do core do BlockAgenda
 *
 * @param value - Horário em string, ex: "09:32"
 *
 * @returns Horário arredondado para o múltiplo de 5 mais próximo, ex: "09:30"
 *
 * @v1
 */
export const roundToNextSlot = (value: string): string => {
    const totalMinutes = timeToMinutes(value);

    const roundedMinutes = Math.round(totalMinutes / 5) * 5;

    const hours = Math.floor(roundedMinutes / 60) % 24;
    const minutes = roundedMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

/**
 * Converte uma posição vertical em pixels de volta para o formato de tempo HH:mm
 * 
 * @remarks
 * Esse método faz parte do core do BlockAgenda
 * 
 * @param pixelY - Posição Y em pixels
 * @param dayStartTime - Hora considerada o Início do dia (Ex.: "08:00")
 * @param pixelsPerMinute - Quantidade de pixels definida por slot de minuto
 * 
 * @returns Horário formatado em string no formato "HH:mm"
 * 
 * @v1
 */
export const pixelsToTime = (
    pixelY: number,
    dayStartTime: string,
    pixelsPerMinute: number
): string => {
    const dayStartMinutes = timeToMinutes(dayStartTime);
    const minutesFromStart = pixelY / pixelsPerMinute;
    const totalMinutes = dayStartMinutes + minutesFromStart;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

/**
 * Formata uma string de data no formato ISO "YYYY-MM-DD" para a representação local de data
 * 
 * @remarks
 * Evita inconsistências de fuso horário criando a data com valores locais explícitos de ano, mês e dia
 * 
 * @param dateOnly - Data em formato string ISO sem horário, ex: "2026-08-30"
 * @param locale - Localidade para formatação (padrão: 'pt-BR')
 * 
 * @returns Data formatada de acordo com o locale informado, ex: "30/08/2026"
 * 
 * @v1
 */
export const formatDateOnly = (dateOnly: string, locale = 'pt-BR'): string => {
    const [y, m, d] = dateOnly.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(locale);
}

/**
 * Converte uma string no formato "YYYY-MM-DD" em um objeto Date do JavaScript
 * 
 * @remarks
 * Instancia a data utilizando o fuso horário local para evitar o deslocamento padrão do construtor Date(string)
 * 
 * @param dateOnly - Data em formato string ISO sem horário, ex: "2026-08-30"
 * 
 * @returns Objeto Date correspondente ao dia especificado
 * 
 * @v1
 */
export const formatDateOnlyToDate = (dateOnly: string): Date => {
    const [y, m, d] = dateOnly.split('-').map(Number);
    return new Date(y, m - 1, d);
}

/**
 * Converte um objeto Date do JavaScript em uma string no formato ISO "YYYY-MM-DD". Ex.: "2026-08-10"
 * 
 * @param d - Objeto Date a ser formatado
 * 
 * @returns String contendo apenas a parte da data no formato "YYYY-MM-DD"
 * 
 * @v1
 */
export const formatDateToDateOnly = (d: Date): string => {
    return d.toISOString().split("T")[0];
}
