"use client"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"

type Props = {
  startTime?: string
  endTime?: string
  setStartTime: (st: string) => void
  setEndTime: (et: string) => void 
}

export function TimePicker({
  startTime,
  endTime,
  setStartTime,
  setEndTime
}: Props) {
  return (
    <FieldGroup className=" max-w-xs flex-row">
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