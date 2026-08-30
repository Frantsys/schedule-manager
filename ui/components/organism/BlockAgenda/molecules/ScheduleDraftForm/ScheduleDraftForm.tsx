"use client"
import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DraftSchedule, ScheduleInput, Customer, Service } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { BriefcaseBusinessIcon, UserRound } from "lucide-react";
import { DatePickerTime } from "@/components/ui/date-time-picker";
import { TimePicker } from "@/components/ui/time-picker";

type Props = {
  draft: DraftSchedule;
  customers: Customer[];
  services: Service[];
  onCancel: () => void;
  onConfirm: (input: ScheduleInput) => Promise<void>;
  setDraft: (d: DraftSchedule) => void
};

export function ScheduleDraftForm({ 
  draft, 
  customers, 
  services, 
  onCancel, 
  onConfirm, 
  setDraft 
}: Props) {
    const [customerId, setCustomerId] = useState("");
    const [serviceId, setServiceId] = useState("");

    const [customer, setCustomer] = useState<Customer | undefined>(undefined);
    const [service, setService] = useState<Service | undefined>(undefined);

    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [startTime, setStartTime] = useState(draft.start_time);
    const [endTime, setEndTime] = useState(draft.end_time)

    const isValid = customerId !== "" && serviceId !== "";

    useEffect(() => {
      console.log("TESTE DE DATA ISO:  " + new Date().toISOString().split('T')[0])
    }, []);

    useEffect(() => {
      setDraft({ dateonly: draft.dateonly, start_time: startTime, end_time: endTime })

    }, [startTime, endTime]);

    const handleCustomerSelect = (c: Customer | null) => {
        if (!c) return;
        setCustomer(c);
        setCustomerId(c.id);
    }

    const handleServiceSelect = (s: Service | null) => {
        if (!s) return;
        setService(s);
        setServiceId(s.id);
    }

    const handleSubmit = async () => {
        if (!isValid || isSubmitting) return;

        setIsSubmitting(true);
        setError(null);

        try {
        await onConfirm({
            customer_id: customerId,
            service_id: serviceId,
            description,
            dateonly: draft.dateonly,
            start_time: draft.start_time,
            end_time: draft.end_time,
        });  
        } catch (err) {
            setError("Não foi possível criar o agendamento. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <div className="flex flex-col gap-3 w-fit min-w-64">
      <div className="text-xs text-muted-foreground w-fit min-w-full flex justify-start pr-12">
        <TimePicker
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        />

      </div>

      <Select value={customer} onValueChange={(v) => handleCustomerSelect(v)}>
        <SelectTrigger className={"w-full justify-between"}>
            <div className="flex items-center gap-1">
                <UserRound size={32} />
                {customer?.name ?? "Cliente"}
            </div>
        </SelectTrigger>
        <SelectContent className={"w-96 min-h-16 h-fit! max-h-32 rounded! p-1"}>
          {customers.map((c) => (
            <SelectItem key={c.id} value={c} className={"rounded! hover:bg-white! hover:border  transition-all duration-200"}>
                <div className=" flex w-full h-6 items-center gap-1 ">
                    <UserRound size={32} />
                    {c.name}
                </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={service} onValueChange={(v) => handleServiceSelect(v)}>
        <SelectTrigger className={"w-full justify-between"}>
            <div className="flex items-center gap-1">
                <BriefcaseBusinessIcon size={32} />
                {service?.name ?? "Serviço"}
            </div>
        </SelectTrigger>
        <SelectContent className={"w-96 min-h-16 rounded! p-1"}>
          {services.map((s) => (
            <SelectItem key={s.id} value={s} className={"rounded! hover:bg-white! hover:border transition-all duration-100"}>
                <div className=" flex w-full h-6 items-center gap-1">
                    <BriefcaseBusinessIcon size={32} />
                    {s.name}
                </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button size="sm" className={"text-secondary-foreground"} onClick={handleSubmit} disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar Agendamento"}
        </Button>
      </div>
    </div>
  );
}