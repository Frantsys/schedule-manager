import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeaderPublic } from "@/modules/public/components/molecules/HeaderPublic";

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen w-full bg-background">
            <HeaderPublic />
            
            <main className="flex-1 w-full flex flex-col items-center justify-center p-6 text-center my-auto">
                <h1 className="text-7xl font-heading font-bold text-foreground">404</h1>
                <h2 className="text-xl font-semibold mt-2 text-foreground">Página não encontrada</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    O endereço que você tentou acessar não existe ou foi movido.
                </p>
                <Button className="mt-6 p-4 px-12 rounded text-sm">
                    <Link href="/">Voltar para o Início</Link>
                </Button>
            </main>
        </div>
    )
}