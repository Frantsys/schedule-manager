import Image from "next/image"
import Link from "next/link"
import logo from "@/public/main-splash-screen-icon.svg"
import { Mail, Phone, MapPin } from "lucide-react"
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa"


export function Footer() {
    return (
        <footer className="w-full bg-accent border-t border-border py-12 px-6 md:px-16 text-foreground">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
                
                <div className="flex flex-col gap-4 max-w-sm">
                    <div className="flex items-center gap-3">
                        <Image 
                            src={logo} 
                            alt="NextServ Logo" 
                            width={48} 
                            height={48} 
                            className="object-contain"
                        />
                        <span className="text-2xl font-bold font-heading text-primary">
                            NextServ
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Conectando você aos melhores estabelecimentos e profissionais da sua região. Agende serviços com facilidade e rapidez.
                    </p>
                    <div className="flex items-center gap-4 text-muted-foreground pt-2">
                        <Link href="https://instagram.com" target="_blank" className="hover:text-primary transition-colors">
                            <FaInstagram className="size-5" />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="hover:text-primary transition-colors">
                            <FaLinkedin className="size-5" />
                        </Link>
                        <Link href="https://facebook.com" target="_blank" className="hover:text-primary transition-colors">
                            <FaFacebook className="size-5" />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
                        Plataforma
                    </h3>
                    <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <li>
                            <Link href="/" className="hover:text-primary transition-colors">Início</Link>
                        </li>
                        <li>
                            <Link href="/search" className="hover:text-primary transition-colors">Buscar Serviços</Link>
                        </li>
                        <li>
                            <Link href="/plans" className="hover:text-primary transition-colors">Planos e Preços</Link>
                        </li>
                        <li>
                            <Link href="/#funcionalidades" className="hover:text-primary transition-colors">Funcionalidades</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
                        Para Negócios
                    </h3>
                    <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <li>
                            <Link href="/auth/signup" className="hover:text-primary transition-colors">Cadastrar Estabelecimento</Link>
                        </li>
                        <li>
                            <Link href="/auth/login" className="hover:text-primary transition-colors">Área do Profissional</Link>
                        </li>
                        <li>
                            <Link href="/plans" className="hover:text-primary transition-colors">Soluções de Agenda</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
                        Contato
                    </h3>
                    <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <Mail className="size-4 text-primary shrink-0" />
                            <span>contato@nextserv.com.br</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="size-4 text-primary shrink-0" />
                            <span>+55 (83) 99999-0000</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin className="size-4 text-primary shrink-0" />
                            <span>Paraíba, Brasil</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} NextServ. Todos os direitos reservados.</p>
                <div className="flex gap-6">
                    <Link href="/termos" className="hover:text-primary transition-colors">Termos de Uso</Link>
                    <Link href="/privacidade" className="hover:text-primary transition-colors">Política de Privacidade</Link>
                </div>
            </div>
        </footer>
    )
}