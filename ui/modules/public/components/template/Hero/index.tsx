import { Button } from "@/components/ui/button";
import map from "@/public/gray-map.png"
import Image from "next/image";

export function Hero() {
    return (
        <section id="apresentação" className="w-full h-4/6 bg-primary flex items-center gap-12 justify-center relative overflow-hidden">          
                    <Image
                        src={map}
                        alt="map"
                        fill
                        priority
                        className="object-cover object-center z-0 opacity-25"
                    />

                        <article className="w-1/2 flex flex-col items-center z-10">
                            <div className="h-3/10 w-8/10">
                            <h1 className="text-4xl font-headings font-semibold text-white">Controle seu Tempo, Serviços e Clientes em um só lugar</h1>
                            
                            </div>
                            <div className="flex w-8/10 gap-4">
                            <Button className={"text-md p-6 w-1/2"}>
                                Quero Conhecer
                            </Button>
                            <Button variant={"outline"} className={"text-md p-6 w-1/2"}>
                                Já sou cliente
                            </Button>
                            </div>
                        </article>

                        
                        <section className="w-1/2 h-full flex flex-col items-center justify-center">
                        </section>
                        
                </section>
    )
}