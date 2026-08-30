import { Calendar1Icon, LineChartIcon, UserRoundPlusIcon } from "lucide-react";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Home",
};

type QuickLinkProps = {
    icon: ReactNode
    label: string
    url: string
}

const quickLinkCard = ({
    icon,
    label,
    url
}: QuickLinkProps) => {

    return (
        <div className="min-w-48 w-fit min-h-18 h-fit border rounded flex items-center px-4 gap-4 cursor-pointer hover:bg-accent">
            <div className="bg-primary/10 rounded p-2 text-primary">
                {icon}
            </div>
            <div className="text-xs font-sans font-semibold text-wrap">
                {label}
            </div>
            <div className="w-8 ">

            </div>
        </div>
    )
}

const recentAccess = () => {
    
}

export default function Home() {
    return(
        <main className="w-full h-screen p-20 overflow-y-auto">
                <section className="w-full min-h-24 h-fit ">
                    <label className="font-heading text-xs tracking-wider font-semibold text-slate-500">Acesso Rápido</label>
                    <main className="w-full min-h-24 flex justify-evenly flex-wrap mt-4">
                        {quickLinkCard({ icon: <Calendar1Icon size={20} />, label: "Acessar sua Agenda", url: "/agenda" })}
                        {quickLinkCard({ icon: <UserRoundPlusIcon size={20} />, label: "Registrar Cliente", url: "/customer/add" })}
                        {quickLinkCard({ icon: <LineChartIcon size={20} />, label: "Visualizar Métricas", url: "/business/reports" })}
                        {quickLinkCard({ icon: <LineChartIcon size={20} />, label: "Adicionar Serviço", url: "/business/services/add" })}

                        
                    </main>
                </section>
                <section className="w-full min-h-64 h-fit mt-4 border">
                    <label className="font-heading text-xs tracking-wider font-semibold text-slate-500">Acessos Recentes</label>
                    <main className="w-full min-h-24 mt-4">
                    </main>
                </section>
        </main>
    )
}