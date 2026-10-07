import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RatingStarsProps {
    rating: number
    maxStars?: number
    className?: string
    starClassName?: string
}

export function RatingStars({ 
    rating, 
    maxStars = 5, 
    className, 
    starClassName 
}: RatingStarsProps) {

    const normalizedRating = (rating / 10) * maxStars
    
    const roundedRating = Math.round(normalizedRating * 2) / 2

    return (
        <div className={cn("flex items-center gap-0.5", className)} title={`${rating.toFixed(2)} de 10`}>
            {Array.from({ length: maxStars }).map((_, index) => {
                const starValue = index + 1
                
                if (roundedRating >= starValue) {
                    return (
                        <Star 
                            key={index} 
                            className={cn("size-4 text-yellow-400 fill-yellow-400", starClassName)} 
                        />
                    )
                }
                
                // Meia Estrela
                if (roundedRating >= starValue - 0.5) {
                    return (
                        <StarHalf 
                            key={index} 
                            className={cn("size-4 text-yellow-400 fill-yellow-400", starClassName)} 
                        />
                    )
                }
                
                return (
                    <Star 
                        key={index} 
                        className={cn("size-4 text-muted-foreground opacity-30", starClassName)} 
                    />
                )
            })}
        </div>
    )
}