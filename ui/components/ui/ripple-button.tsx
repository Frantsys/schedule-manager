"use client"

import { motion, type Transition } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

interface Ripple {
  id: number
  x: number
  y: number
}

// Tipagem polimórfica: T representa o elemento base que será renderizado
export type RippleProps<T extends React.ElementType> = {
  as?: T
  scale?: number
  transition?: Transition
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "scale" | "transition">

export function Ripple<T extends React.ElementType = "div">({
  as,
  children,
  className,
  scale = 10,
  transition = { duration: 0.6, ease: "easeOut" },
  onClick,
  ...props
}: RippleProps<T>) {
  const Component = as || "div"
  const [ripples, setRipples] = React.useState<Ripple[]>([])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const id = Date.now()
    
    setRipples(prev => [...prev, { id, x: event.clientX - rect.left, y: event.clientY - rect.top }])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 600)

    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLElement>)(event)
    }
  }

  return (
    <Component
      data-slot="ripple-container"
      onClick={handleClick}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          aria-hidden
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale, opacity: 0 }}
          transition={transition}
          className="pointer-events-none absolute size-5 rounded-full bg-current"
          style={{ top: ripple.y - 10, left: ripple.x - 10 }}
        />
      ))}
    </Component>
  )
}

export default Ripple