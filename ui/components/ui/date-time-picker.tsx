"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { formatDateOnly, formatDateOnlyToDate } from "../organism/BlockAgenda/lib/schedule-time"

type Props = {
  dateStart?: string
  startTime?: string
  endTime?: string

  setDateOnly: (s: string) => void
  setStartTime: (st: string) => void
  setEndTime: (et: string) => void 
}


export function DatePickerTime({
  dateStart,
  startTime,
  endTime,
  setDateOnly,
  setStartTime,
  setEndTime
}: Props) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)



    useEffect(() => {
      if (dateStart) {
        const dateOnlyFormated = formatDateOnlyToDate(dateStart);

        setDate(dateOnlyFormated);
      }
    }, [dateStart])


    

    const handleDateSelect = (d: Date) => {
        setDate(d);
        const dateOnlyFormat = d.toISOString().split("T")[0];
        setDateOnly(dateOnlyFormat);
    }

  return (
    <FieldGroup className=" max-w-xs flex-row">
      <Field className="w-fit">
        <FieldLabel htmlFor="date-picker-optional">Data</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button variant="outline" id="date-picker-optional" className="w-32 justify-between font-normal">{date ? format(date, "PPP", { locale: ptBR } ) : "Selecione a Data"}<ChevronDownIcon data-icon="inline-end" /></Button>} />
          <PopoverContent className="w-64 overflow-hidden p-0" align="start">
            <Calendar
            className="w-full"
              mode="single"
              selected={date}
              captionLayout="dropdown"
              locale={ptBR}
              defaultMonth={date}
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional">Hora inicio</FieldLabel>
        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          id="time-picker-optional"
          step="1"
          defaultValue="10:30:00"
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>

      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional">Hora final</FieldLabel>
        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          id="time-picker-optional"
          step="1"
          defaultValue="10:30:00"
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  )
}
