"use client"
import logo from "@/public/main-splash-screen-icon.svg"
import Image from "next/image"
import Link from "next/link"

type LogoProps = {
    theme?: "default" | "light"
}

export function Logo({ theme = "default" }: LogoProps) {
    return(
        <Link href={"/"} className="flex items-center min-w-32 h-fit bg-transparent">
            <Image
                src={logo}
                alt="next-serv-logo"
                width={32}
            />

            <span className={`
                ${theme == "default" ? "text-primary" : "text-white"}
                font-heading font-semibold text-lg`}>
                NextServ
            </span>
        </Link>
    )
}