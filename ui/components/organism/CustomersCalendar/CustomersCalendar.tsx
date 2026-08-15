import { Calendar } from "@/components/ui/calendar"
import { Customer } from "@/types"

type Props = {
    onClickDate: (d: Date) => void
    customers: Customer[]
}


export function CustomersCalendar() {
    return(
        <aside className="h-full w-full border">
            <header className="w-full h-2/10">
            
            </header>
            <section className="w-full">
                <Calendar
                locale={{
                    code: "pt-BR"
                }}
                />
            </section>
        </aside>
    )
}