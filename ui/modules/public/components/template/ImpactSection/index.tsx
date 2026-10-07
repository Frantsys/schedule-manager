import { 
  Scissors, 
  Stethoscope, 
  Dumbbell, 
  CalendarCheck, 
  MapPin, 
  Clock 
} from "lucide-react"

export function ImpactSectionTemplate() {
    return (
        <section className="w-full h-7/12 md:h-5/12 flex flex-col md:flex-row items-center justify-center bg-background">
            
           
            <div className="bg-primary w-full h-2/12 md:h-full md:w-2/12" />
            <div className="bg-secondary w-full h-1/12 md:h-full md:w-1/12" />
            
            <main className="relative w-full h-full flex-1 flex justify-center items-center md:w-6/10 overflow-hidden px-4">
                
                
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <Scissors className="absolute top-2 left-2 md:top-8 md:left-8 size-8 md:size-16 text-primary opacity-20 -rotate-12 transition-all" />
                    
                    <Stethoscope className="absolute bottom-2 left-6 md:bottom-12 md:left-1/4 size-10 md:size-24 text-secondary opacity-20 rotate-12 transition-all" />
                    
                    <Dumbbell className="absolute top-6 right-8 md:top-12 md:right-1/4 size-10 md:size-20 text-primary opacity-20 rotate-45 transition-all" />
                    
                    <CalendarCheck className="absolute bottom-2 right-2 md:bottom-8 md:right-10 size-8 md:size-16 text-secondary opacity-20 -rotate-6 transition-all" />
                    
                    <MapPin className="absolute top-1/3 md:top-1/2 -translate-y-1/2 left-1 md:left-2 size-6 md:size-12 text-primary opacity-15 transition-all" />
                    
                    <Clock className="absolute bottom-1/3 md:top-1/2 md:-translate-y-1/2 right-1 md:right-4 size-8 md:size-14 text-primary opacity-15 rotate-12 transition-all" />
                </div>

                <h1 className="relative z-10 font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-center max-w-xs sm:max-w-sm md:max-w-xl text-foreground">
                    Encontre o profissional ideal e agende seu horário sem complicações.
                </h1>
                
            </main>

            {/* Pilares Direitos */}
            <div className="bg-secondary w-full h-1/12 md:h-full md:w-1/12" />
            <div className="bg-primary w-full h-2/12 md:h-full md:w-2/12" />
            
        </section>
    )
}