import { Suspense } from "react"
import { SearchFilters } from "@/modules/public/components/molecules/SearchFilters"
import { InterativeMap } from "@/modules/public/components/organisms/InterativeMap"
import { SearchResults } from "@/modules/public/components/organisms/SearchResults"
import { ResultsSkeleton } from "@/modules/public/components/molecules/ResultsSkeleton"
import { SearchHeader } from "@/modules/public/components/organisms/SearchHeader"


interface PageProps {
    searchParams: Promise<{
        type?: string
        term?: string
        location?: string
    }>
}

export default async function SearchPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams


    return (
        <div className="flex flex-col w-full h-screen overflow-hidden bg-background">
            <SearchHeader />

            <div className="flex flex-1 overflow-hidden w-full bg-background">
                <SearchFilters />
                
                <Suspense 
                    key={JSON.stringify(resolvedSearchParams)} 
                    fallback={<ResultsSkeleton />}
                >
                    <SearchResults searchParams={resolvedSearchParams} />
                </Suspense>

                <InterativeMap />
            </div>
        </div>
    )
}