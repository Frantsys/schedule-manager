"use client"
import { SidebarButton } from "@/components/molecules/SidebarButton/SidebarButton";
import { SidebarIcon } from "lucide-react";
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
}

export function SideBar({

    sections
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
        <aside className="w-2/12 h-full relative flex items-start">
            <section className={`
           
            md:w-48 bg-background h-full pt-20`}>

                    <section className="w-full p-4 md:block hidden">
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