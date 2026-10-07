import Link from "next/link"
import { 
  MapPin, 
  CalendarCheck, 
  Zap, 
  Smartphone, 
  User,
  ArrowRight
} from "lucide-react"
import { FeatureItem } from "../../molecules/FeatureItem"


export function CustomerFeaturesCard() {
  const features = [
    { icon: MapPin, text: "Encontre qualquer serviço perto de você" },
    { icon: CalendarCheck, text: "Agende com os melhores estabelecimentos e profissionais" },
    { icon: Zap, text: "Processo rápido e simplificado" },
    { icon: Smartphone, text: "Use em qualquer lugar a qualquer hora" },
  ]

  return (
    <div className="flex flex-col bg-card border border-border rounded p-8 hover:shadow-2xl  transition-shadow duration-300 delay-100 ease">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <User className="size-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-foreground">Para Clientes</h2>
      </div>
      
      <ul className="space-y-6 flex-1">
        {features.map((feature, index) => (
          <FeatureItem key={index} icon={feature.icon} text={feature.text} />
        ))}
      </ul>

      <a href="#pesquisa" className="
      transition-all duration-200
      mt-10 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-lg hover:gap-4  font-semibold">
        <span>Explorar Serviços</span>
        <ArrowRight className="size-5" />
      </a>
    </div>
  )
}