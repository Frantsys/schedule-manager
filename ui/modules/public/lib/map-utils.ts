
const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || "";

export interface MapLocation {
    id: string;
    latitude: number;
    longitude: number;
    title: string;
    subtitle?: string;
    category?: string;
}

export const mapConfig = {
    defaultCenter: {
        latitude: -6.77, 
        longitude: -37.80,
        zoom: 13,
    },
    
    getStyleUrl: (theme: "light" | "dark" = "light") => {
        console.log("TESTE KEY: " + MAPTILER_API_KEY + " =======================")
        const styleName = theme === "dark" ? "dataviz-dark" : "streets-v2";
        return `https://api.maptiler.com/maps/${styleName}/style.json?key=${MAPTILER_API_KEY}`;
    }
};