'use client'

import { useState } from "react"
import { PricingPlanCard } from "../../organisms/PricingPlanCard/PricingPlanCard"

export function Plans() {
    const [billingType, setBillingType] = useState<"monthly" | "annual">("monthly")

    const benefits = [
        "Gerenciamento de agendamentos",
        "Cadastro de clientes",
        "Catálogo de serviços",
        "CRM simplificado",
        "Agente Whatsapp",
        "Agente de IA CRM",
        "Análise Financeira e Relatórios",
        "Agente de IA"
    ]

    return (
        <section className="w-full py-12 sm:py-16 bg-primary/5 space-y-8">
            <header className="flex flex-col items-center justify-center gap-4 text-center px-4">
                <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-foreground">
                    Escolha o plano ideal para o seu negócio
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                    Cancele ou mude de plano a qualquer momento. Economize até 20% escolhendo o faturamento anual.
                </p>

                <div className="flex items-center justify-center gap-3 mt-2 bg-background p-1.5 rounded-full border border-border shadow-xs">
                    <button
                        type="button"
                        onClick={() => setBillingType("monthly")}
                        className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            billingType === "monthly"
                                ? "bg-primary text-primary-foreground shadow-xs"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        Mensal
                    </button>

                    <button
                        type="button"
                        onClick={() => setBillingType("annual")}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            billingType === "annual"
                                ? "bg-primary text-primary-foreground shadow-xs"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <span>Anual</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500 text-white dark:bg-emerald-600">
                            -20%
                        </span>
                    </button>
                </div>
            </header>

            <section 
                id="planos" 
                className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 lg:gap-8 px-4 sm:px-8"
            >
                <PricingPlanCard
                    label="Plano Gratuito"
                    benefits={benefits}
                    benefitsMaxIndex={3}
                    price="Free"
                    type={billingType}
                    description="Plano gratuito para negócios simples"
                />

                <PricingPlanCard
                    label="Básico"
                    benefits={benefits}
                    benefitsMaxIndex={5}
                    price={21.99}
                    annualPrice={17.59} 
                    type={billingType}
                    description="Plano básico para a maioria dos empreendimentos"
                    featured
                />

                <PricingPlanCard
                    label="Pro"
                    benefits={benefits}
                    benefitsMaxIndex={benefits.length}
                    price={128.89}
                    annualPrice={99.89} 
                    type={billingType}
                    description="Plano ideal para negócios profissionais maiores"
                />
            </section>
        </section>
    )
}