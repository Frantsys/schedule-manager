import Link from "next/link";
import { Home, StoreIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationBar, NavigationItem } from "@/components/ui/NavigationBar";
import { Logo } from "@/modules/public/components/atoms/Logo";

const HeaderActions = () => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-xs sm:text-sm font-semibold h-8 sm:h-9 px-2.5 sm:px-4"
      >
        <Link href="/auth/login">Entrar</Link>
      </Button>

      <Button 
        size="sm" 
        className="text-xs sm:text-sm font-medium h-8 sm:h-9 px-2.5 sm:px-4"
      >
        <Link href="/auth/signup">Cadastrar</Link>
      </Button>
    </div>
  );
};

export function HeaderPublic() {
  return (
    <header className="w-full bg-transparent absolute top-0 left-0 h-24 z-50 flex items-center justify-center">
      <main className="w-11/12 md:w-5/6 h-14 sm:h-16 bg-white/95 backdrop-blur-xs rounded-xl shadow-xs px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        <div className="shrink-0">
          <Logo />
        </div>
        <HeaderActions />
      </main>
    </header>
  );
}