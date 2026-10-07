import { LoginForm } from "@/modules/auth/components/LoginForm"
import map from "@/public/gray-map.png"
import Image from "next/image"

export default function Login() {
    return (
        <main className="w-full h-screen flex items-center justify-center">
            <section className="w-full h-full md:w-6/10 flex items-center justify-center">
                <LoginForm />
            </section>
            
            <section className="hidden md:h-full w-4/10 bg-primary md:flex flex-col items-center justify-between py-16 relative overflow-hidden">
                <Image 
                    src={map}
                    alt="map"
                    fill
                    priority
                    className="object-cover object-center z-0 opacity-20 pointer-events-none"
                />

                <div className="z-10 flex flex-col items-center w-full space-y-12 px-6">
                    <h1 className="text-primary-foreground font-heading text-3xl xl:text-4xl font-semibold leading-tight w-4/5 text-left">
                        Gestão simples e controle total do seu negócio em um só lugar.
                    </h1>

                    <h1 className="text-primary-foreground/90 font-heading text-2xl xl:text-3xl font-medium leading-relaxed w-4/5 text-right self-end">
                        Seus dados e os de seus clientes protegidos com segurança máxima.
                    </h1>
                </div>
            </section>
        </main> 
    )
}