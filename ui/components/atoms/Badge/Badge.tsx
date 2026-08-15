import { BadgeAlert, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";


type BadgeVariant = "primary" 
                    | "secondary" 
                    | "finished"
                    | "pending"
                    | "cancelled"
                    | "unavailable"


type BadgeProps = {
    icon?: ReactNode
    children: ReactNode
    variant?: BadgeVariant
    className?: string
}

export function Badge({
    children,
    icon,
    variant = "primary",
    className
} : BadgeProps) {

    const variantMapper: Record<BadgeVariant, string> = {
        primary: "bg-primary/20 text-primary",
        secondary: "bg-secondary/20 text-secondary",
        pending: "bg-pending/20 text-pending",
        finished: "bg-finished/20 text-finished",
        cancelled: "bg-destructive/20 text-destructive",
        unavailable: "bg-unavailable/20 text-unavailable"
    }

    return(
        <div className={` ${className} ${variantMapper[variant]} truncate font-semibold w-fit min-w-12 px-1 h-fit text-sm flex items-start gap-1 p-1 rounded`}>
            <div className="h-full flex items-start pt-0.5">
                {icon}
            </div>
            <div className=" truncate">
                {children}
            </div>
        </div>
    );
}