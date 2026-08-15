import { ReactNode } from "react"

type Props = {
    icon: ReactNode
    children: ReactNode
    className?: string
}

export function IconField({
    icon,
    children,
    className
}: Props) {
    return(
        <label className={
            className + ` flex items-start gap-1 h-8 `}>
            <div className="h-full flex items-center">
                {icon}
            </div>
            <div className="h-fit p-1 mt-0.5">
                {children}
            </div>
        </label>
    );

}