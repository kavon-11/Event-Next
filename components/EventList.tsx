import { cacheLife } from "next/cache";
import EventCard, { EventCardProps } from "@/components/EventCard";
import { eventsLocal } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const EventList = async () => {
    'use cache'
    cacheLife('seconds');
    const response = await fetch(`${BASE_URL}/api/events`);
    const { events } = await response.json();

    const allEvents = [...eventsLocal, ...(events || [])];

    return (
        <ul className="events" style={{ listStyle: "none" }}>
            {allEvents && allEvents.length > 0 && allEvents.map((event: EventCardProps, index: number) => (
                <li key={event.title}>
                    <EventCard {...event} priority={index === 0} />
                </li>
            ))}
        </ul>
    );
};

export default EventList;
