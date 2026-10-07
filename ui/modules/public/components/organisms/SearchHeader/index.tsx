'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GeneralSearchBar } from "@/modules/public/components/molecules/GeneralSearchBar"
import Image from "next/image"
import map from "@/public/gray-map.png"
import { Logo } from "../../atoms/Logo"


export function SearchHeader() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [category, setCategory] = useState<string | null>(searchParams.get("type") || "establishment")
    const [term, setTerm] = useState<string>(searchParams.get("term") || "")
    const [location, setLocation] = useState<string>(searchParams.get("location") || "")

    useEffect(() => {
        setCategory(searchParams.get("type") || "establishment")
        setTerm(searchParams.get("term") || "")
        setLocation(searchParams.get("location") || "")
    }, [searchParams])

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (category) params.set("type", category)
        if (term.trim()) params.set("term", term.trim())
        if (location.trim()) params.set("location", location.trim())
        
        router.push(`/search?${params.toString()}`)
    }

    return (
        <header className="h-20 w-full bg-primary border-b border-border flex items-center px-4 md:px-8 shrink-0 z-10 relative overflow-hidden">
            <Image
                src={map}
                alt="map"
                fill
                priority
                className="object-cover object-center z-0 opacity-25"
            />
            <div className="w-full flex items-center  max-w-4xl z-10">
                <Logo theme="light" />
                <GeneralSearchBar 
                    category={category!}
                    onCategoryChange={setCategory}
                    term={term}
                    onTermChange={setTerm}
                    location={location}
                    onLocationChange={setLocation}
                    onSubmit={handleSearch}
                />
            </div>
        </header>
    )
}