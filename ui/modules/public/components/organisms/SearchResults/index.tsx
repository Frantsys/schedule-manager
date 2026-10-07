import { EstablishmentCard } from "@/modules/public/components/molecules/EstablishmentCard"

export interface ResultsProps {
    searchParams: {
        type?: string
        term?: string
        location?: string

        categories?: string
        order_by?: string
        price?: string
    }
}

async function fetchEstablishments(filters: ResultsProps["searchParams"]) {
    const type = filters.type || "establishment";
    const term = filters.term || "";
    const location = filters.location || "";
    
    const categories = filters.categories ? filters.categories.split(",") : [];
    const orderBy = filters.order_by || "";
    const maxPrice = Number(filters.price) || 0;

    await new Promise((resolve) => setTimeout(resolve, 3000))

    return [
        {
            establishment: {
                id: "t1",
                name: "Barbearia",
                slug: "barbearia-generica",
                address: {
                    city: "Pombal",
                    country: "Brasil",
                    district: "Centro",
                    state: "Paraíba",
                    street: "Av. Santa Barra",
                    number: "120",
                    zipcode: "54880-000",
                },
                category: "Barbearia",
                email: "ee",
                phone: "(81)",
                rating: 9.60
            },
            services: [
                {
                    id: "S1",
                    name: "Corte Degradê",
                    price: 30.99,
                    duration_minutes: 60,
                    establishment_id: "t1"
                },
                {
                    id: "S2",
                    name: "Nevou",
                    price: 72.99,
                    duration_minutes: 60,
                    establishment_id: "t1"
                },
                {
                    id: "S3",
                    name: "Corte Social",
                    price: 32.00,
                    duration_minutes: 25,
                    establishment_id: "t1"
                }
            ]
        },
        {
            establishment: {
                id: "t6",
                name: "Barbearia",
                slug: "barbearia-generica",
                address: {
                    city: "Pombal",
                    country: "Brasil",
                    district: "Centro",
                    state: "Paraíba",
                    street: "Av. Santa Barra",
                    number: "120",
                    zipcode: "54880-000",
                },
                category: "Barbearia",
                email: "ee",
                phone: "(81)",
                rating: 9.60
            },
            services: [
                {
                    id: "S1",
                    name: "Corte Degradê",
                    price: 30.99,
                    duration_minutes: 60,
                    establishment_id: "t6" 
                },
                {
                    id: "S2",
                    name: "Nevou",
                    price: 72.99,
                    duration_minutes: 60,
                    establishment_id: "t6"
                },
                {
                    id: "S3",
                    name: "Corte Social",
                    price: 32.00,
                    duration_minutes: 25,
                    establishment_id: "t6"
                }
            ]
        },
        {
            establishment: {
                id: "t2",
                name: "Barbearia",
                slug: "barbearia-generica",
                address: {
                    city: "Pombal",
                    country: "Brasil",
                    district: "Centro",
                    state: "Paraíba",
                    street: "Av. Santa Barra",
                    number: "120",
                    zipcode: "54880-000",
                },
                category: "Barbearia",
                email: "ee",
                phone: "(81)",
                rating: 9.60
            },
            services: [
                {
                    id: "S1",
                    name: "Corte Degradê",
                    price: 30.99,
                    duration_minutes: 60,
                    establishment_id: "t2" 
                },
                {
                    id: "S2",
                    name: "Nevou",
                    price: 72.99,
                    duration_minutes: 60,
                    establishment_id: "t2" 
                },
                {
                    id: "S3",
                    name: "Corte Social",
                    price: 32.00,
                    duration_minutes: 25,
                    establishment_id: "t2" 
                }
            ]
        }
    ]
}

export async function SearchResults({ searchParams }: ResultsProps) {
    const data = await fetchEstablishments(searchParams)
    const term = searchParams.term || ""
    const location = searchParams.location || ""

    return (
        <main className="flex-1 p-4 md:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-accent">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-heading text-foreground">
                    Resultados da busca
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Mostrando resultados para <span className="font-medium text-foreground">{term || "todos"}</span> em <span className="font-medium text-foreground">{location || "qualquer lugar"}</span>
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {data.map((item) => (
                    <EstablishmentCard 
                        key={item.establishment.id} 
                        establishment={item.establishment} 
                        services={item.services} 
                    />
                ))}
            </div>
        </main>
    )
}