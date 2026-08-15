import { IconField } from "@/components/atoms/IconField/IconFIeld";
import { MailIcon, Phone, UserRoundIcon } from "lucide-react";


export function CustomersCalendarCard() {
    return(
        <div className="w-full min-h-20 h-fit border bg-accent rounded-xl p-4">
            <header className="">
                <IconField
                icon={<UserRoundIcon size={16} strokeWidth={2} />}
                >
                    <label className=" font-medium text-sm">Adriano</label>
                </IconField>
            </header>
            <main className="w-full px-4">
                <IconField
                icon={<MailIcon size={16} strokeWidth={2} className=" font-medium text-foreground/80" />}
                >
                    <label className="text-sm font-medium text-foreground/80">test@email.com</label>
                </IconField>

                <IconField
                icon={<Phone size={16} strokeWidth={2} className=" font-medium text-foreground/80" />}
                >
                    <label className="text-sm font-medium text-foreground/80">+55 83 9908-1209</label>
                </IconField>
            </main>
        </div>
    )
}