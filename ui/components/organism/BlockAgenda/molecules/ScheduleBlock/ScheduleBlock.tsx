import { ScheduleCard } from "@/components/molecules/ScheduleCard/ScheduleCard"
import { Schedule } from "@/types"


type Props = {
    top: number
    height: number
    schecule: Schedule
}

const ScheduleBlock = ({
    top,
    height,
    schecule
}: Props) => {
    return(
        <div style={{
            position: "absolute",
            top: top,
            height: height,
            width: "100%"
        }}
        className=""
        >
            <ScheduleCard key={schecule.id} data={schecule} />
        </div>
    )
}

export default ScheduleBlock;