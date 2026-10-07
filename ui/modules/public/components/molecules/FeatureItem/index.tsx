import { 
  LucideIcon
} from "lucide-react"

interface FeatureItemProps {
  icon: LucideIcon
  text: string
  variant?: "default" | "inverted"
}

export function FeatureItem({ icon: Icon, text, variant = "default" }: FeatureItemProps) {
  const isDefault = variant === "default"
  
  return (
    <li className="flex items-center gap-4">
      <div className={`mt-1 p-2 rounded-md shrink-0 ${isDefault ? "bg-primary/10" : "bg-primary-foreground/10"}`}>
        <Icon className={`size-5 ${isDefault ? "text-primary" : "text-primary-foreground"}`} />
      </div>
      <span className={`font-medium leading-relaxed ${isDefault ? "text-muted-foreground" : "text-primary-foreground/90"}`}>
        {text}
      </span>
    </li>
  )
}