'use client'

import { KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, MapPin, StoreIcon, BriefcaseBusinessIcon } from "lucide-react"

export interface GeneralSearchBarProps {
    category: string;
    onCategoryChange: (value: string | null) => void;
    term: string;
    onTermChange: (value: string) => void;
    location: string;
    onLocationChange: (value: string) => void;
    onSubmit: () => void;
}

export function GeneralSearchBar({
    category,
    onCategoryChange,
    term,
    onTermChange,
    location,
    onLocationChange,
    onSubmit
}: GeneralSearchBarProps) {
    const options = [
        { icon: <StoreIcon />, label: "Estabelecimentos", value: "establishment" },
        { icon: <BriefcaseBusinessIcon />, label: "Serviços", value: "services" },
    ]

    const selectedOption = options.find((item) => item.value === category)

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit()
        }
    }

    return (
        <InputGroup className="h-10 w-full md:min-w-4xl bg-background border rounded flex items-center overflow-hidden">
            <InputGroupAddon className="min-w-12 md:min-w-48 border-r shrink-0" align="inline-start">
                <Select value={category} onValueChange={onCategoryChange}>
                    <SelectTrigger className="h-full border-none focus:ring-0 w-full text-xs bg-background rounded-none">
                        {/* 2. Customizamos o SelectValue para renderizar o Ícone + Label */}
                        <SelectValue placeholder="Selecione">
                            {selectedOption && (
                                <div className="flex items-center gap-2">
                                    <div className="shrink-0 text-muted-foreground [&>svg]:size-4">
                                        {selectedOption.icon}
                                    </div>
                                    <span className="hidden md:block">{selectedOption.label}</span>
                                </div>
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    
                    <SelectContent className="rounded p-1 w-48">
                        <SelectGroup>
                            <SelectLabel className="text-sm">Selecione</SelectLabel>
                            {options.map((item) => (
                                <SelectItem className="text-sm p-2 rounded" key={item.value} value={item.value}>
                                    <div className="flex gap-2 items-center">
                                        
                                        <div className="shrink-0 text-muted-foreground size-4">
                                            {item.icon}
                                        </div>
                                        <span>{item.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </InputGroupAddon>

            <div className="flex flex-1 items-center px-3 gap-2">
                <SearchIcon className="size-4 text-muted-foreground shrink-0" />
                <input 
                    type="text"
                    value={term}
                    onChange={(e) => onTermChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full text-sm placeholder:text-sm bg-transparent focus:outline-none border-none" 
                    placeholder="Pesquisar profissional, serviço..."
                />
            </div>

            <div className="h-5 w-px bg-border shrink-0" />

            <div className="flex flex-1 items-center px-3 gap-2">
                <MapPin className="size-4 text-muted-foreground shrink-0" />
                <input 
                    type="text"
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full text-sm placeholder:text-sm bg-transparent focus:outline-none border-none" 
                    placeholder="Cidade, bairro ou rua..."
                />
            </div>

            <InputGroupAddon className="p-0 shrink-0" align="inline-end">
                <Button 
                    type="button" 
                    onClick={onSubmit}
                    className="h-10 text-sm rounded-l-none rounded-r px-4 md:px-6"
                >
                    <SearchIcon className="size-4" />
                    <span className="hidden md:block">Pesquisar</span>
                </Button>
            </InputGroupAddon>
        </InputGroup>
    )
}