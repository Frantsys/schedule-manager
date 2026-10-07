'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import map from "@/public/gray-map.png"
import { AutoWriteText } from "@/modules/public/components/molecules/AutoWriteText"
import { GeneralSearchBar } from "@/modules/public/components/molecules/GeneralSearchBar"
    
export function SearchHero() {
    const router = useRouter()

    const [category, setCategory] = useState<string | null>("establishment")
    const [term, setTerm] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    

    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)

    const titles = [
        "Encontre e agende qualquer serviço próximo de você.",
        "Barbearias perto de mim.",
        "Clínicas que fazem manutenção de aparelho.",
        "Personal trainers que auxiliem em pilates.",
        "Costureira que atende às 14:00.",
        "Cabelereiras que fazem progressiva."
    ]

    
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                },
                (error) => {
                    
                    console.warn("Usuário negou ou ocorreu um erro ao buscar localização:", error.message)
                }
            )
        }
    }, [])

    const handleSearch = () => {
        const params = new URLSearchParams()

        if (category) params.set("type", category)
        if (term.trim()) params.set("term", term.trim())
        if (location.trim()) params.set("location", location.trim())

        router.push(`/search?${params.toString()}`)
    }

    return (
        <section id="pesquisa" className="w-full h-4/6 pt-12 bg-primary flex flex-col items-center gap-12 justify-center relative overflow-hidden px-8 md:px-0">
            <Image 
                src={map}
                alt="map"
                fill
                priority
                className="object-cover object-center z-0 opacity-25"
            />
            <h1 className="text-3xl text-white font-bold font-heading z-10 relative text-center px-4
            min-h-30
            md:min-h-12
            ">
                <AutoWriteText texts={titles} />
            </h1>
            <div className="z-10 relative">
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
        </section>
    )
}