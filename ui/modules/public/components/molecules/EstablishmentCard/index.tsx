"use client"

import { Badge } from "@/components/ui/Badge/Badge"
import { Label } from "@/components/ui/label"
import { Ripple } from "@/components/ui/ripple-button"
import { Establishment, Service } from "@/types"
import { MapPinIcon, StarIcon } from "lucide-react"
import { RatingStars } from "../../atoms/RatingStars"
import { useRouter } from "next/navigation"

type EstablishmentCardProps = {
    establishment: Establishment,
    services?: Service[]
}


export function EstablishmentCard({
    establishment,
    services
}: EstablishmentCardProps) {

    const router = useRouter();
        
    return (
        
        <Ripple
        onClick={() => router.push(`/e/${establishment.slug}`)}
        transition={{
            animationDuration: {
                delay: 0.5
            }
        }}
        className="w-full text-left">
            <div className="w-full h-fit border rounded-lg p-3 sm:p-4 hover:bg-accent bg-card transition-colors">
                
                
                <header className="w-full flex gap-3 sm:gap-4">

                    <div className="shrink-0 h-20 w-20 sm:h-24 sm:w-24 bg-primary/20 rounded-md"></div>

                    <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-4 min-w-0">

                        <div className="flex flex-col flex-1 min-w-0 py-1">
                            <h1 className="text-base sm:text-lg font-semibold truncate text-foreground">
                                {establishment.name}
                            </h1>
                            
                            <div className="flex items-start text-[11px] sm:text-xs text-muted-foreground mt-1">
                                <MapPinIcon size={14} className="shrink-0 mr-1 mt-0.5" />
                                <span className="line-clamp-2">
                                    Rua {establishment.address.street}, {establishment.address.district} - {establishment.address.number} | {establishment.address.state}, {establishment.address.city}
                                    <strong className="ml-1 whitespace-nowrap text-foreground">(há 1,2km)</strong>
                                </span>
                            </div>
                            
                            <div className="mt-2.5 flex items-center text-xs gap-1.5 font-medium text-foreground">
                                <RatingStars
                                    rating={establishment.rating}
                                    starClassName="size-3.5"
                                />
                                <span className="mt-px">{establishment.rating.toFixed(1)}</span>
                            </div>
                        </div>

                        
                        <div className="flex flex-row sm:flex-col flex-wrap justify-start sm:justify-start items-start gap-1.5 sm:w-32 shrink-0 mt-2 sm:mt-0">
                            <Badge className="px-2 py-0 h-5 text-[10px] sm:text-xs">
                                Mais próximo
                            </Badge>
                            {
                                establishment.rating > 8 && 
                                <Badge variant="secondary" className="px-2 py-0 h-5 text-[10px] sm:text-xs">
                                    Melhor avaliado
                                </Badge>
                            }
                            <Badge variant="primary" className="px-1.5 py-0 h-5 flex items-center gap-1 text-[10px] sm:text-xs">
                                <span>Destaque</span>
                            </Badge>    
                        </div>
                    </div>
                </header>

                {services && services.length > 0 && (
                    <main className="w-full h-fit mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-border">
                        <Label className="text-xs sm:text-sm text-muted-foreground mb-3 block">
                            Serviços Populares
                        </Label>
                        <div className="flex flex-col gap-2">
                            {services.map((s, index) => (
                                <div 

                                    key={s.id || index} 
                                    className="w-full flex flex-row items-center justify-between p-2 sm:p-3 rounded-md border sm:border-none sm:border-b border-border last:border-0 hover:bg-background/50 gap-2"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                                        <h1 className="text-xs sm:text-sm font-medium truncate text-foreground">
                                            {s.name}
                                        </h1>
                                        <Badge variant="unavailable" className="w-fit text-[10px] text-muted-foreground px-1.5 py-0 h-4">
                                            {s.duration_minutes} min
                                        </Badge>
                                    </div>
                                    <div className="text-xs sm:text-sm text-primary font-semibold whitespace-nowrap shrink-0">
                                        R$ {s.price.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                )}
            </div>
        </Ripple>
    )
}
    
