"use client"
import { SidebarButton } from "@/components/molecules/SidebarButton/SidebarButton";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InfoIcon, KeyIcon, KeyRoundIcon, LogOutIcon, Settings2Icon, SidebarIcon, UserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export type SidebarButton = {
    icon: ReactNode,
    label: string
    url: string
    params?: Record<string, object>
}

export type SidebarSection = {
    label: string
    buttons: SidebarButton[]
}

type Props = {
    sections: SidebarSection[]
    footer?: SidebarButton
}

export function SideBar({
    sections,
    footer
}: Props) {

    const router = useRouter();
    const pathName = usePathname();
    const [current, setCurrent] = useState(pathName);

    useEffect(() => {
        setCurrent(pathName);
    }, [pathName]);

    const navigateTo = (route: string) => {
        router.push(route);
    };

    return(
        <aside className="w-2/12 h-full relative flex items-start border-r">
            <section className={`   
           
            md:w-full bg-background h-full pt-4`}>
                    <header className="w-full h-1/12 p-2">
                        <Popover>
                            <PopoverTrigger render={
                                <Button variant={"outline"} className="border rounded w-full h-full flex items-center text-start! px-3 hover:bg-accent">
                                    <label className="text-sm font-medium text-foreground text-start">Clínica Orali</label>
                                </Button>} />
                                <PopoverContent className={"bg-background shadow-xs! rounded! w-64 p-0! ml-4"} >
                                    <div className="h-64 w-full">
                                        <section className="w-full h-2/5 border-b bg-accent flex items-center justify-center">
                                            <div className="">
                                                <div className="w-16 h-16 bg-pink-200 border border-pink-300 rounded-full" />
                                            </div>
                                        </section>
                                        <section className="w-full h-3/5 p-4 space-y-1">
                                            <button className="w-full h-fit flex items-center gap-2 py-2 hover:bg-accent rounded text-muted-foreground p-2">
                                                <UserRound size={16} />
                                                <span>Perfil</span>
                                            </button>
                                            <button className="w-full h-fit flex items-center gap-2 py-2 hover:bg-accent rounded text-muted-foreground p-2">
                                                <KeyRoundIcon size={16} />
                                                <span>Conta</span>
                                            </button>
                                            <button className="w-full h-fit flex items-center gap-2 py-2 hover:bg-red-300 hover:text-background rounded text-muted-foreground p-2">
                                                <LogOutIcon size={16} />
                                                <span>Sair</span>
                                            </button>
                                        </section>
                                    </div>
                                </PopoverContent>
                        </Popover>
                    </header>

                    <main className="w-full h-11/12 flex flex-col justify-between ">
                        <section className="w-full p-4 md:block hidden">
                            {
                                sections.map((s) => (
                                    <div key={s.label}>
                                        <label className="uppercase font-heading text-[10px] font-semibold text-foreground/60 tracking-widest">{s.label}</label>
                                        <div className="h-fit mt-2 space-y-1">
                                            {
                                            s.buttons.map((b) => (
                                                <SidebarButton
                                                key={b.label}
                                                icon={b.icon}
                                                selected={b.url == current}
                                                onClick={() => navigateTo(b.url)}
                                                >
                                                    {b.label}
                                                </SidebarButton>
                                            ))
                                        }
                                        </div>
                                    </div>
                                ))
                            }
                        </section>

                        <footer className="w-full h-2/12 p-4">
                            {
                                footer && 
                                <SidebarButton 
                                    icon={footer.icon} 
                                    selected={footer.url == current}
                                    onClick={() => navigateTo(footer.url)}
                                >
                                    {footer.label}
                                </SidebarButton>
                            }
                        </footer>
                    </main>

                    <section className="w-full p-4 md:hidden block">
                        {
                            sections.map((s) => (
                                <div key={s.label}>
                                    <label className="uppercase font-heading text-xs font-semibold text-foreground/60 tracking-widest">{s.label}</label>
                                    <div className="h-fit mt-2 space-y-2">
                                        {
                                        s.buttons.map((b) => (
                                            <SidebarButton
                                            key={b.label}
                                            icon={b.icon}
                                            selected={b.url == current}
                                            onClick={() => navigateTo(b.url)}
                                            >
                                                {b.label}
                                            </SidebarButton>
                                        ))
                                    }
                                    </div>
                                </div>
                            ))
                        }
                    </section>

            </section>

        </aside>
    );
}