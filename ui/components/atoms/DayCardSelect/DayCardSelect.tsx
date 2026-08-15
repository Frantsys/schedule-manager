"use client"

import { ReactNode } from "react";

type Props = {
    selected?: boolean
    selected2?: boolean
    onClick?: (v?: any | any[]) => void
    children: ReactNode
}

export function DayCardSelect({
    selected = false,
    selected2,
    onClick,
    children
}: Props) {
    return(
        <div
        onClick={onClick}
        className={`
            md:w-full md:h-fit md:min-h-0 md:gap-0 md:text-sm md:font-medium
            sm:w-full sm:h-fit sm:min-h-0 sm:gap-0 sm:text-sm sm:font-medium
            
            active:bg-background/25 transition-all duration-100
            text-center text-background h-fit min-h-24 w-12 rounded flex flex-col justify-center items-center gap-6
        ${selected ? "bg-background/20" : "hover:bg-accent/10 "}
        ${selected2 ? "border border-background/20" : ""}
        `}
        
        >
            {children}
        </div>
    );
}