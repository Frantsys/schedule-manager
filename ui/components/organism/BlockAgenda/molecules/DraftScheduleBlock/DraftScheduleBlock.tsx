"use client"
import { Customer, DraftSchedule, ScheduleInput, Service } from "@/types";
import { ScheduleDraftForm } from "../ScheduleDraftForm/ScheduleDraftForm";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { useRef } from "react";

type Props = {
  top: number;
  height: number;
  customers: Customer[]
  services: Service[]
  draft: DraftSchedule;
  onCancel: () => void;
  onConfirm: (input: ScheduleInput) => Promise<void>;
  setDraft: (d: DraftSchedule) => void
};

export function DraftScheduleBlock({ 
    top, 
    height, 
    draft, 
    customers,
    services,
    setDraft,
    onCancel, 
    onConfirm
}: Props) {

    const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <Popover open={true} onOpenChange={(open) => { if (!open) onCancel(); }}>
      <div
        ref={anchorRef}
        className="absolute w-full rounded-md bg-primary/10 p-0.5"
        style={{ top, height }}
      />

      <PopoverContent anchor={anchorRef} side="right" align="start" className="w-fit" >
        <ScheduleDraftForm customers={customers} services={services} setDraft={setDraft} draft={draft} onCancel={onCancel} onConfirm={onConfirm} />
      </PopoverContent>
    </Popover>
  );
}