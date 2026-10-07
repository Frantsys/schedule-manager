import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const manropeHeading = Manrope({ subsets: ['latin'], variable: '--font-heading' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Schedule"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "min-h-screen antialiased",
        geistSans.variable,
        geistMono.variable,
        dmSans.variable,
        manropeHeading.variable
      )}
    >
      <body className="min-h-screen w-full bg-background flex flex-col font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}