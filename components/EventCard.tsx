import Link from "next/link";
import pin from "@/public/icons/pin.svg"
import calender from "@/public/icons/calendar.svg"
import clock from "@/public/icons/clock.svg"
import Image, { StaticImageData } from "next/image";
export interface EventCardProps {
    title: string;
    image: StaticImageData | string;
    slug: string;
    location: string;
    date: string;
    time: string;
}
function EventCard({ title, image, location, date, time, slug }: EventCardProps) {
    return (
        <Link href={`/events/${slug}`} id="event-card">
            <Image src={image} alt={title} width={410} height={300} className="poster" />

            <div className="p-4">
                <div className="mb-3">
                    <p className="text-lg font-semibold">{title}</p>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <Image src={pin} alt="location icon" width={16} height={16} />
                    <p className="text-sm">{location}</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src={calender} alt="calendar icon" width={16} height={16} />
                        <span className="text-sm">{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Image src={clock} alt="clock icon" width={16} height={16} />
                        <span className="text-sm">{time}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default EventCard;

