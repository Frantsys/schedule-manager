import Link from "next/link"
import { 
  Clock, 
  MessageCircle, 
  Briefcase,
  Building2,
  ArrowRight,
} from "lucide-react"
import { FeatureItem } from "../../molecules/FeatureItem"

export function BusinessFeaturesCard() {
  const features = [
    { icon: Clock, text: "Controle seu tempo e seus clientes" },
    { icon: MessageCircle, text: "Lembretes automáticos via Whatsapp" },
    { icon: Briefcase, text: "Gerencie seu negócio com uma única ferramenta integrada" },
  ]

  return (
    <div className="flex flex-col bg-primary rounded p-8 hover:shadow-2xl  transition-shadow duration-300 delay-100 ease">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
          <Building2 className="size-6 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-primary-foreground">Para Negócios</h2>
      </div>
      
      <ul className="space-y-6 flex-1">
        {features.map((feature, index) => (
          <FeatureItem key={index} icon={feature.icon} text={feature.text} variant="inverted" />
        ))}
      </ul>

      <Link href="/business" className="mt-10 w-full flex items-center justify-center gap-2 bg-background hover:bg-border hover:gap-4 text-foreground py-4 rounded-lg font-semibold transition-all">
        <span>NextServ para Negócios</span>
        <ArrowRight className="size-5" />
      </Link>
    </div>
  )
}