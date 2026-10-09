"use client"

import { Map as MapIcon, MapPinned } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { MapBase } from "@/modules/public/components/molecules/MapBase"
import { MapLocation } from "@/modules/public/lib/map-utils"

const mockLocations: MapLocation[] = [
    {
        id: "1",
        title: "Barbearia do João",
        subtitle: "Corte e Barba - R$ 45,00",
        latitude: -6.772,
        longitude: -37.801
    },
    {
        id: "2",
        title: "Dra. Ana (Fisioterapia)",
        subtitle: "Clínica Vida Saudável",
        latitude: -6.768,
        longitude: -37.795
    }
]

export function InterativeMap() {
    
    /**
     * Renderização separada por dois motivos:
     * 1. Evitar duplicação de código
     * 2. Evitar dupla renderização de conteúdo condicional(renderizar coisa que o usuário não vai ver)
     * 3. Evitar queda de performance
     * @returns Conteúdo
     */
    const renderMap = () => (
        <MapBase 
            locations={mockLocations} 
            theme="light" 
            onPinClick={(loc) => console.log("Clicou no card do:", loc.title)}
        />
    )

    return (
        <>
           
            <aside className="hidden lg:flex lg:items-start lg:justify-center w-1/3 xl:w-3/12 p-4 h-8/10 rounded">
                {renderMap()}
            </aside>

            
            <div className="lg:hidden fixed top-24 right-4 z-50">
                <Sheet>
                    <SheetTrigger>
                        <Button 
                            size="icon" 
                            className="size-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            <MapPinned className="size-6" />
                        </Button>
                    </SheetTrigger>
                    
                    <SheetContent side="right" className="w-[90vw] sm:w-100 p-0 flex flex-col h-full">
                        <SheetHeader className="p-4 border-b bg-background z-10 shrink-0">
                            <SheetTitle className="text-left flex items-center gap-2">
                                <MapIcon className="size-5 text-primary" />
                                Mapa Interativo
                            </SheetTitle>
                        </SheetHeader>
                        
                        {/* Corpo da Aba (O mapa é renderizado aqui ocupando o espaço restante) */}
                        <div className="flex-1 relative w-full h-full bg-muted/20">
                            {renderMap()}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}