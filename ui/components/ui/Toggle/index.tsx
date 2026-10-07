"use client"

import { useState } from "react"


type ToggleProps = {
    label: string
    value: string
    selected?: boolean
    onToggle?: (value: string) => void
}


export function Toggle({
    label,
    value,
    selected,
    onToggle
}: ToggleProps) {

    const [toggled, setToggled] = useState(false);

    return(
        <div
        onClick={() => setToggled(!toggled)}
        className={`
        ${toggled ? "bg-primary text-background font-medium border-primary  " : "bg-background text-foreground"}
         px-2 border rounded-3xl transition-all duration-150`}>
            <label className="text-xs">{label}</label>
        </div>
    )
}