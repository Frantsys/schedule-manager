import { Footer } from "@/modules/public/components/template/Footer";
import { SearchHero } from "@/modules/public/components/template/SearchHero";
import { FeaturesTemplate } from "@/modules/public/components/template/FeaturesSection";
import { ImpactSectionTemplate } from "@/modules/public/components/template/ImpactSection";


export default function Home() {

    return (
        <main className="w-full h-screen overflow-y-auto overscroll-none bg-primary">

            <SearchHero />
            <ImpactSectionTemplate />
            <FeaturesTemplate />
            <Footer />
        </main> 
    )
}