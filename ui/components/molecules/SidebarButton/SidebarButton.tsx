import { IconField } from "@/components/atoms/IconField/IconFIeld"
import { ReactNode } from "react"

type Props = {
    id?: string
    icon?: ReactNode
    children: ReactNode
    onClick?: (v?: any | any[]) => void
    className?: string,
    selected?: boolean
}

export function SidebarButton({
    id,
    icon,
    children,
    onClick,
    className,
    selected = false
}: Props) {
    return(
        <div key={id}
        onClick={onClick}
        className={`transition-all duration-100 w-full h-10 flex items-center rounded px-2 text-sm
        ${selected ? "bg-primary/20 border-l-primary border-l-4 text-primary  font-semibold" : "hover:bg-accent"}
        ` + className}>
            <IconField
            icon={icon}
            >
                {children}
            </IconField>
        </div>
    );
}