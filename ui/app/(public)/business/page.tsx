import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import { Plans } from "@/modules/public/components/template/Plans"
import { Benefits } from "@/modules/public/components/template/Benefits"
import { Footer } from "@/modules/public/components/template/Footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CircleQuestionMark } from "lucide-react"

export const meta: Metadata = {
    title: "Bem Vindo"
}

export default function Hero() {

    return(
        <main className="w-full h-screen overflow-y-auto bg-background">
            <section className="w-full
            min-h-256 pt-24 py-12
            md:h-200
            flex">
                <section className="w-6/12 h-full flex flex-col justify-center items-center">
                    <div className="w-3/4 space-y-6">
                        <h1 className="text-6xl font-heading font-semibold">
                            Transforme sua <strong className="text-primary">agenda</strong> em uma máquina de vendas automática.
                        </h1>
                        <h4 className="text-lg font-heading font-medium">
                            Centralize agendamentos, reduza faltas com lembretes no WhatsApp e gerencie seu negócio em uma única plataforma simples e poderosa.
                        </h4>
                    </div>
                    <div className="w-3/4 mt-12 flex flex-col gap-4
                    md:flex-row
                    ">
                        <Button className={"text-lg p-6 w-64"}>
                            Testar Gratuitamente
                        </Button>

                        <Button variant={"outline"} className={"text-lg p-6 w-64"}>
                            Ver Planos
                        </Button>
                    </div>
                </section>
                <section className="w-6/12 h-full">

                </section>
            </section>
            
            <Benefits />
            <Plans />
            <section className="w-full min-h-9/10 flex justify-center">
                <main className="w-full h-full p-8
                md:w-7/10
                ">
                    <header className="w-full h-1/10 flex items-center px-4 gap-4">
                    <CircleQuestionMark size={32} className="text-primary" />
                        <label className="text-3xl font-heading font-semibold">
                            Dúvidas Frequentes
                        </label>
                    </header>
                    <Accordion className={"rounded bg-background! mt-4"}>
                            <AccordionItem className={"rounded p-2 px-4 bg-background!"}>
                                <AccordionTrigger className={"rounded p-2 bg-background"}>
                                   <span className="text-xl font-heading">Preciso instalar algum aplicativo no meu computador?</span>
                                </AccordionTrigger>
                                <AccordionContent className={"border-t py-6 p-2 min-h-32"}>
                                    <p className="text-lg">Não. O NextServ é 100% online e funciona direto no navegador do seu celular, tablet ou computador.</p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem className={"rounded p-2 px-4 bg-background!"}>
                                <AccordionTrigger className={"rounded p-2 bg-background"}>
                                   <span className="text-xl font-heading">Meus clientes precisam baixar aplicativo para agendar?</span>
                                </AccordionTrigger>
                                <AccordionContent className={"border-t py-6 p-2 min-h-32"}>
                                    <p className="text-lg">Não! O seu link de agendamento abre direto no navegador do cliente, tornando o processo ultra-rápido sem necessidade de download.</p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem className={"rounded p-2 px-4 bg-background!"}>
                                <AccordionTrigger className={"rounded p-2 bg-background"}>
                                   <span className="text-xl font-heading">Como funcionam os lembretes via WhatsApp?</span>
                                </AccordionTrigger>
                                <AccordionContent className={"border-t py-6 p-2 min-h-32"}>
                                    <p className="text-lg">O sistema envia notificações automáticas de confirmação e lembrete antes do horário agendado, reduzindo drasticamente a taxa de faltas.</p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem className={"rounded p-2 px-4 bg-background!"}>
                                <AccordionTrigger className={"rounded p-2 bg-background"}>
                                   <span className="text-xl font-heading">Posso testar antes de assinar um plano pago?</span>
                                </AccordionTrigger>
                                <AccordionContent className={"border-t py-6 p-2 min-h-32"}>
                                    <p className="text-lg">Sim, oferecemos um período de teste gratuito para você configurar seu catálogo e experimentar todas as funcionalidades no seu dia a dia.</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                </main>
            </section>
            <Footer />
        </main>
    )
}