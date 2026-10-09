"use client"

import { ReactNode, useMemo } from "react"
import Map, { Marker, GeolocateControl, NavigationControl } from "react-map-gl/maplibre"
import { MapPin } from "lucide-react"

import "maplibre-gl/dist/maplibre-gl.css"

import { mapConfig, MapLocation } from "@/modules/public/lib/map-utils"

interface MapBaseProps {
    locations?: MapLocation[];
    theme?: "light" | "dark";
    renderCustomPin?: (location: MapLocation) => ReactNode; 
    onPinClick?: (location: MapLocation) => void;
}

export function MapBase({ 
    locations = [], 
    theme = "light",
    renderCustomPin,
    onPinClick 
}: MapBaseProps) {
    
    const mapStyle = useMemo(() => mapConfig.getStyleUrl(theme), [theme]);

    return (
        <div className="w-full h-full relative rounded overflow-hidden border ">
            <Map
                style={{
                    borderRadius: 2
                }}
                initialViewState={mapConfig.defaultCenter}
                mapStyle={mapStyle}
                attributionControl={false}
                interactive={true}
            >
                <GeolocateControl 
                    position="top-right" 
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    showUserLocation={true}

                />

                <NavigationControl position="top-right" showCompass={false} />

                {locations.map((loc) => (
                    <Marker
                        key={loc.id}
                        latitude={loc.latitude}
                        longitude={loc.longitude}
                        anchor="bottom"
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            onPinClick?.(loc);
                        }}
                    >
                        
                        {renderCustomPin ? (
                            renderCustomPin(loc)
                        ) : (
                            <div className="relative group cursor-pointer">
                                
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-50 bg-foreground text-background text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                                    <p className="font-bold">{loc.title}</p>
                                    {loc.subtitle && <p className="text-muted/80">{loc.subtitle}</p>}
                                    
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                                </div>

                                {/* O Ícone do Pino em si */}
                                <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg border-2 border-background transform transition-transform group-hover:scale-110">
                                    <MapPin className="size-5" />
                                </div>
                            </div>
                        )}
                    </Marker>
                ))}
            </Map>
        </div>
    )
}