"use client"

import { Check, CreditCard, QrCode, Barcode, ShieldCheck, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { useIsMobile } from "@/modules/public/hooks/use-mobile"
import { Badge } from "@/components/ui/Badge/Badge"
import { ReactNode, useState } from "react"

export type PlanPayment = {
  plan: string
  value: number
  isPromotional?: boolean
  originalValue?: number
  benefits: string[]
  type: "monthly" | "annual"
}

type PaymentDrawerProps = {
  trigger: ReactNode
  plan: PlanPayment
}

type PaymentMethod = "pix" | "credit_card" | "boleto"

export function PaymentDrawer({ trigger, plan }: PaymentDrawerProps) {
  const [open, setOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("pix")
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useIsMobile()

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success("Processando seu pagamento com segurança...")
      setOpen(false)
    } catch {
      toast.error("Ocorreu um erro ao processar o pagamento.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger className="w-full h-full">
        {trigger}
      </DrawerTrigger>

      <DrawerContent className="max-w-lg mx-auto p-4 sm:p-6">

        <DrawerHeader className="text-left px-0 pt-0">
          <div className="flex items-center justify-between gap-2">
            <DrawerTitle className="text-2xl font-bold text-foreground">
              {plan.plan}
            </DrawerTitle>

            {plan.isPromotional && (
              <Badge variant={"primary"} className="gap-1 px-1 flex items-center" >
                <Sparkles className="size-4" /> Promocional
              </Badge>
            )}
          </div>
          <DrawerDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
            Revise os detalhes da assinatura antes de prosseguir.
          </DrawerDescription>
        </DrawerHeader>


        <div className="space-y-6 py-2 overflow-y-auto max-h-[60vh] pr-1">
          
          <div className="p-4 rounded-xl bg-accent/40 border border-border flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Valor {plan.type == "monthly" ? "mensal" : "anual"} total</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {formatCurrency(plan.value)}
                </span>
                <span className="text-xs text-muted-foreground">/ {plan.type == "monthly" ? "mês" : "ano"}</span>
              </div>
            </div>

            {plan.isPromotional && plan.originalValue && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground line-through">
                  {formatCurrency(plan.originalValue)}
                </p>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                  Desconto aplicado
                </span>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              O que está incluído no seu plano:
            </h4>
            <ul className="space-y-2.5 text-sm">
              {plan.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mt-0.5 shrink-0">
                    <Check className="size-3.5" />
                  </div>
                  <span className="text-foreground/90 text-xs sm:text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Forma de pagamento
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod("pix")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all gap-2 cursor-pointer ${
                  selectedMethod === "pix"
                    ? "border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary"
                    : "border-border hover:bg-accent text-muted-foreground"
                }`}
              >
                <QrCode className="size-5" />
                <span>PIX</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("credit_card")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all gap-2 cursor-pointer ${
                  selectedMethod === "credit_card"
                    ? "border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary"
                    : "border-border hover:bg-accent text-muted-foreground"
                }`}
              >
                <CreditCard className="size-5" />
                <span>Cartão</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("boleto")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all gap-2 cursor-pointer ${
                  selectedMethod === "boleto"
                    ? "border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary"
                    : "border-border hover:bg-accent text-muted-foreground"
                }`}
              >
                <Barcode className="size-5" />
                <span>Boleto</span>
              </button>
            </div>
          </div>
        </div>


        <DrawerFooter className="px-0 pb-0 pt-4 gap-2">
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full h-11 text-sm font-semibold shadow-sm cursor-pointer"
          >
            {isLoading ? "Processando..." : `Assinar por ${formatCurrency(plan.value)}/${plan.type == "monthly" ? "mês" : "ano"}`}
          </Button>

          <DrawerClose>
            <Button variant="ghost" className="w-full text-xs text-muted-foreground cursor-pointer">
              Cancelar
            </Button>
          </DrawerClose>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground mt-1">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            <span>Pagamento 100% seguro e criptografado</span>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
