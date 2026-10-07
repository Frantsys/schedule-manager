import { 
    Calendar1Icon, 
    UserRoundIcon, 
    BriefcaseBusinessIcon, 
    UsersRoundIcon, 
    BrainCircuitIcon 
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { FunctionalityCard } from "../../organisms/FuncionalityCard/FunctionalityCard"

export function Benefits() {
    return (
        <section id="funcionalidades" className="w-full min-h-full bg-white grid grid-cols-1 md:grid-cols-3 gap-6 items-center px-6 md:px-12 py-8">
            <FunctionalityCard
                name="Agenda em Blocos"
                description="Visualize seu dia num piscar de olhos e organize seus atendimentos sem choque de horários."
                icon={<Calendar1Icon className="size-6" />}
            />
            <FunctionalityCard
                name="Cadastro de Clientes"
                description="Mantenha históricos, preferências e dados de contato organizados em um só local."
                icon={<UserRoundIcon className="size-6" />}
            />
            <FunctionalityCard
                name="Catálogo de Serviços"
                description="Personalize seu menu de atendimento com preços, tempos de execução e regras claras."
                icon={<BriefcaseBusinessIcon className="size-6" />}
            />
            <FunctionalityCard
                name="Agente de WhatsApp"
                description="Atenda clientes 24 horas por dia e envie lembretes automáticos para reduzir faltas."
                icon={<FaWhatsapp size={24} />}
            />
            <FunctionalityCard
                name="CRM Completo"
                description="Identifique clientes recorrentes, recupere sumidos e aumente o faturamento do seu negócio."
                icon={<UsersRoundIcon className="size-6" />}
            />
            <FunctionalityCard
                name="Assistente de IA"
                description="Elimine tarefas manuais repetitivas e deixe a inteligência artificial trabalhar por você."
                icon={<BrainCircuitIcon className="size-6" />}
            />
        </section>
    )
}