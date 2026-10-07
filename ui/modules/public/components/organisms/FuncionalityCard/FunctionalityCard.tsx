import { Button } from "@/components/ui/button"
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external"
import { ReactNode } from "react"


type Props = {
    icon: ReactNode
    name: string
    description: string
    actionLabel?: string
    action?: () => void
}

export function FunctionalityCard({
    icon,
    name,
    description,
    actionLabel,
    action
}: Props) {
    return(
        <div className="w-sm min-h-48 h-fit border rounded p-8 bg-white hover:bg-accent space-y-2">
            <div className="bg-primary/20 p-4 w-fit h-fit rounded text-primary">
                {icon}
            </div>
            <h1 className="text-primary text-lg font-semibold font-heading">{name}</h1>
            <p className="text-sm text-muted-foreground min-h-12">{description}</p>
            {
                action && actionLabel &&
                <Button variant={"outline"} className={"text-sm p-4"}>
                    {actionLabel}
                </Button>
            }
        </div>  
    )
}