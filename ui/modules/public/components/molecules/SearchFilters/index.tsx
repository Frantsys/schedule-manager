"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Filter, Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export type SearchFilters = {
    price: number
    order_by: "location" | "rating" | ""
    categories: string[]
}


const CATEGORIES_LIST = [
    { label: "Barbearia", value: "barbearia" },
    { label: "Cabeleireiro", value: "cabeleireiro" },
    { label: "Clínica", value: "clinica" },
    { label: "Estética", value: "estetica" },
    { label: "Fisioterapia", value: "fisioterapia" },
    { label: "Pilates", value: "pilates" },
]

export function SearchFilters() {
    const url = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [openCategories, setOpenCategories] = useState(false);

    const [current, setCurrent] = useState<SearchFilters>({
        categories: searchParams.get("categories")?.split(",").filter(Boolean) || [],
        order_by: (searchParams.get("order_by") as SearchFilters["order_by"]) || "",
        price: Number(searchParams.get("price")) || 0
    });

    const activeFiltersCount = 
        (current.categories.length > 0 ? 1 : 0) +
        (current.order_by !== "" ? 1 : 0) +
        (current.price > 0 ? 1 : 0);

    const onApplyFilter = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (current.categories.length > 0) {
            params.set("categories", current.categories.join(","));
        } else {
            params.delete("categories");
        }

        if (current.order_by) {
            params.set("order_by", current.order_by);
        } else {
            params.delete("order_by");
        }

        if (current.price > 0) {
            params.set("price", current.price.toString());
        } else {
            params.delete("price");
        }

        router.push(`${url}?${params.toString()}`);
    }

    const onClearFilters = () => {
        setCurrent({ categories: [], order_by: "", price: 0 });

        const params = new URLSearchParams(searchParams.toString());
        params.delete("categories");
        params.delete("order_by");
        params.delete("price");

        router.push(`${url}?${params.toString()}`);
    }

    const renderFilterContent = () => (
        <div className="flex flex-col h-full w-full">
            <div className="hidden md:flex items-center gap-2 mb-6 text-foreground font-semibold">
                <Filter className="size-4" />
                <h2>Filtros</h2>
            </div>
            
            <div className="space-y-8 text-sm flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-accent">
                
                <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Categorias</h3>
                    <Popover open={openCategories} onOpenChange={setOpenCategories}>
                        <PopoverTrigger className={"w-full"}>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCategories}
                                className="w-full justify-between font-normal"
                            >
                                {current.categories.length > 0
                                    ? `${current.categories.length} selecionada(s)`
                                    : "Selecione..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-70 p-0" align="start">
                            <Command>
                                <CommandInput placeholder="Buscar categoria..." />
                                <CommandList>
                                    <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                                    <CommandGroup>
                                        {CATEGORIES_LIST.map((category) => (
                                            <CommandItem
                                                key={category.value}
                                                value={category.label}
                                                onSelect={() => {
                                                    setCurrent(prev => {
                                                        const exists = prev.categories.includes(category.value);
                                                        if (exists) {
                                                            return { ...prev, categories: prev.categories.filter(c => c !== category.value) };
                                                        }
                                                        return { ...prev, categories: [...prev.categories, category.value] };
                                                    });
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        current.categories.includes(category.value) ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {category.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>


                <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Ordenar por</h3>
                    <Select 
                        value={current.order_by === "" ? undefined : current.order_by} 
                        onValueChange={(val) => setCurrent(prev => ({ ...prev, order_by: val as SearchFilters["order_by"] }))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a ordem...">
                                
                                {current.order_by === "location" && "Mais próximo"}
                                {current.order_by === "rating" && "Melhor avaliado"}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="location">Mais próximo</SelectItem>
                            <SelectItem value="rating">Melhor avaliado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium text-foreground">Preço</h3>
                    <RadioGroup 
                        value={current.price.toString()} 
                        onValueChange={(val) => setCurrent(prev => ({ ...prev, price: Number(val) }))}
                        className="space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="0" id="price-all" />
                            <Label htmlFor="price-all" className="cursor-pointer font-normal">Qualquer valor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="50" id="price-50" />
                            <Label htmlFor="price-50" className="cursor-pointer font-normal">Até R$ 50,00</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="150" id="price-150" />
                            <Label htmlFor="price-150" className="cursor-pointer font-normal">Até R$ 150,00</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="300" id="price-300" />
                            <Label htmlFor="price-300" className="cursor-pointer font-normal">Até R$ 300,00</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="500" id="price-500" />
                            <Label htmlFor="price-500" className="cursor-pointer font-normal">Até R$ 500,00</Label>
                        </div>
                    </RadioGroup>
                </div>

            </div>
            
            <div className="w-full flex flex-col justify-center gap-3 mt-2 pt-4 border-t shrink-0"> 
                <Button onClick={onApplyFilter} className="w-full md:text-sm text-[16px] md:py-0 py-4">
                    Aplicar
                </Button>
                <Button onClick={onClearFilters} variant="outline" className="w-full md:text-sm text-[16px] md:py-0 py-4">
                    Limpar
                </Button>
            </div>
        </div>
    )

    return (
        <>
            <aside className="hidden md:flex flex-col w-3/12 bg-background p-4">
                <article className="border rounded w-full h-[80vh]  p-6 bg-card flex flex-col">
                    {renderFilterContent()}
                </article>
            </aside>

            <div className="md:hidden fixed bottom-6 right-4 z-50">
                <Sheet>
                    <SheetTrigger>
                        <Button 
                            size="icon" 
                            className="size-14 rounded-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 relative"
                        >
                            <Filter className="size-6" />
                            {activeFiltersCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-destructive-foreground border-2 border-background">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </Button>
                    </SheetTrigger>
                    
                    <SheetContent side="right" className="w-[85vw] sm:w-100 flex flex-col p-6 overflow-y-auto">
                        <SheetHeader className="mb-6 shrink-0">
                            <SheetTitle className="flex items-center gap-2 text-left">
                                <Filter className="size-5 text-primary" />
                                Filtros de Busca
                            </SheetTitle>
                        </SheetHeader>
                        
                        {renderFilterContent()}
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}