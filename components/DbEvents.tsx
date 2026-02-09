import { cacheLife } from "next/cache";
import EventCard, { EventCardProps } from "@/components/EventCard";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

const DbEvents = async () => {
    'use cache'
    cacheLife('seconds');

    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    // Serialize to plain objects to mimic API response and ensure React compatibility
    const serializedEvents = JSON.parse(JSON.stringify(events));

    return (
        <>
            {serializedEvents && serializedEvents.length > 0 && serializedEvents.map((event: EventCardProps) => (
                <li key={event.title}>
                    <EventCard {...event} />
                </li>
            ))}
        </>
    );
};

export default DbEvents;
