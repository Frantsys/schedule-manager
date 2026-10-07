import { Badge } from "@/components/ui/Badge/Badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2Icon, XCircleIcon } from "lucide-react"
import { PaymentDrawer, type PlanPayment } from "../PaymentDrawer"

type Props = {
    label: string
    description?: string
    benefits: string[]
    benefitsMaxIndex: number
    price: number | "Free"
    annualPrice?: number
    type: "monthly" | "annual"
    action?: (data?: any | any[] | undefined | null) => void
    featured?: boolean
}

export function PricingPlanCard({
    label,
    description,
    benefits,
    benefitsMaxIndex,
    price = "Free",
    annualPrice,
    type,
    featured = false,
    action
}: Props) {
    const activeBenefits = benefits.slice(0, benefitsMaxIndex)

    const isAnnual = type === "annual"
    const currentPrice = isAnnual && annualPrice ? annualPrice : (price === "Free" ? 0 : price)
    
    const planData: PlanPayment = {
        plan: `${label} (${isAnnual ? "Anual" : "Mensal"})`,
        value: currentPrice,
        isPromotional: featured || (isAnnual && !!annualPrice),
        originalValue: isAnnual && typeof price === "number" ? price : undefined,
        benefits: activeBenefits,
        type: type
    }

    return (
        <div className={`
        ${featured ? "border-primary/50 shadow-sm" : "border-border"}
        border rounded w-md min-h-128 h-fit bg-background p-4 px-6 hover:bg-accent/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between
        `}>
            <div>
                <header className="w-full flex justify-between items-center">
                    <label className="text-muted-foreground font-medium">{label}</label>
                    {featured && <Badge className="text-xs px-2">Custo benefício</Badge>}
                </header>

                <div className="py-4 w-full">
                    {price === "Free" ? (
                        <h1 className="text-4xl font-bold">Grátis</h1>
                        
                    ) : (
                        <h1 className="text-4xl font-bold">
                            R${currentPrice}
                            <span className="text-[20px] font-normal text-muted-foreground">/{type == "monthly" ? "mês" : "ano"}</span>
                        </h1>
                    )}
                    {isAnnual && annualPrice && typeof price === "number" && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                            Economia no plano anual
                        </p>
                    )}
                </div>
                    
                <main className="w-full space-y-4">
                    {description && (
                        <div className="w-full text-sm text-muted-foreground min-h-10 h-fit">
                            {description}
                        </div>
                    )}
                    
                    <div className="w-full h-fit space-y-2.5">
                        {benefits.map((b, i) => {
                            const included = i < benefitsMaxIndex;
                            return (
                                <div 
                                    key={i} 
                                    className={`
                                        ${included ? "font-medium text-foreground" : "text-muted-foreground/60"}
                                        w-full flex items-center gap-2 text-sm
                                    `}
                                >
                                    {included ? (
                                        <CheckCircle2Icon size={16} className="text-primary shrink-0" />
                                    ) : (
                                        <XCircleIcon size={16} className="shrink-0" />
                                    )}
                                    <span className={!included ? "line-through" : ""}>{b}</span>
                                </div>
                            )
                        })}
                    </div>
                </main>
            </div>

            <footer className="w-full h-10 mt-6">
                <PaymentDrawer
                    plan={planData}
                    trigger={
                        <Button 
                            variant={featured ? "default" : "outline"} 
                            className="w-full h-full text-sm rounded font-semibold cursor-pointer"
                        >
                            Assinar
                        </Button>
                    }
                />
            </footer>
        </div>
    )
}
