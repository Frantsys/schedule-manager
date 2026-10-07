import { DM_Sans, Manrope } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";

const manropeHeading = Manrope({subsets:['latin'],variable:'--font-heading'});

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'});

export default function RootLayout({ children }: LayoutProps<"/auth">) {
  return (
    <main
      className={cn("h-screen", "antialiased", "font-sans", dmSans.variable, manropeHeading.variable)}
    >
      <main className="h-full w-full overflow-x-hidden">
           {children}
      </main>
    </main>
  );
}