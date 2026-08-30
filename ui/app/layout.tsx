import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SideBar, SidebarButton, SidebarSection } from "@/components/organism/Sidebar/SideBar";
import { Calendar1Icon, HomeIcon, InfoIcon, UsersRoundIcon } from "lucide-react";

const manropeHeading = Manrope({subsets:['latin'],variable:'--font-heading'});

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const sections: SidebarSection[] = [
  {
    label: "Principal",
    buttons: [
      {
        icon: <HomeIcon size={16} />,
        label: "Home",
        url: "/home",
        params: {
          "Teste": { aoba: 2 }
        }
      },
      {
        icon: <Calendar1Icon size={16} />,
        label: "Agenda",
        url: "/agenda",
        params: {
          "Teste": { aoba: 2 }
        }
      },
      {
        icon: <UsersRoundIcon size={16} />,
        label: "Clientes",
        url: "/customers",
        params: {
          "Teste": { aoba: 2 }
        }
      }
    ]
  }
]

const footer: SidebarButton = {
  icon: <InfoIcon size={16} />,
  label: "Meu Perfil",
  url: "/profile",

}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-screen", "antialiased", geistSans.variable, geistMono.variable, "font-sans", dmSans.variable, manropeHeading.variable)}
    >
      <body className="min-h-full h-screen flex w-full overflow-x-hidden">
          <SideBar sections={sections} footer={footer} />
          <main className="w-10/12 h-screen rounded">
            <header className="w-full h-1/10 border-b"></header>
            <section className=" w-full h-9/10">{children}</section>
          </main>
      </body>
    </html>
  );
}
