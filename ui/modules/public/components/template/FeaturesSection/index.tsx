import { BusinessFeaturesCard } from "../../organisms/BusinessFeaturesCard"
import { CustomerFeaturesCard } from "../../organisms/CustomerFeaturesCard"


export function FeaturesTemplate() {
  return (
    <section 
      id="funcionalidades" 
      className="w-full bg-background py-20 px-6 md:px-16 flex justify-center"
    >
      <div className="max-w-7xl w-full flex flex-col gap-12">

        <div className="text-center flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">
            Uma plataforma, <span className="text-primary">duas soluções.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Seja para encontrar o serviço perfeito ou para gerenciar sua agenda de ponta a ponta, o NextServ entrega o que você precisa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CustomerFeaturesCard />
          <BusinessFeaturesCard />
        </div>

      </div>
    </section>
  )
}