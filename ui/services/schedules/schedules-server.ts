import { Schedule, ScheduleInput } from "@/types";

export async function createSchedule(input: ScheduleInput): Promise<Schedule> {
  const response = await fetch("/api/schedules", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Falha ao criar agendamento: ${response.status}`);
  }

  return response.json();
}


export async function updatedSchedule(input: ScheduleInput): Promise<Schedule> {
  const response = await fetch("/api/schedules", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Falha ao atualizar agendamento: ${response.status}`);
  }

  return response.json();
}