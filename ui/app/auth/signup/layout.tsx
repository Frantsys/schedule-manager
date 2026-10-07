import { ReactNode } from "react";
import map from "@/public/gray-map.png"
import Image from "next/image";


export default function SignUpLayout({children} : {children: ReactNode}) {
    return(
        <main className="
        
        w-full h-screen flex items-center justify-center">
                <section className="
                w-full h-full bg-background
                md:h-full md:w-6/10 flex items-center justify-center">
                    {children}
                </section>

                <section className="
                hidden
                md:h-full w-4/10 bg-primary md:flex flex-col items-center py-12 overflow-x-hidden relative">
            <Image 
                src={map}
                alt="map"
                fill
                priority
                className="object-cover object-center z-0 opacity-25"
            />
                </section>
        </main> 
    )
}