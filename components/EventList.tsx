import EventCard from "@/components/EventCard";
import { eventsLocal } from "@/lib/constants";
import { Suspense } from "react";
import DbEvents from "./DbEvents";

const EventList = () => {
    return (
        <ul className="events" style={{ listStyle: "none" }}>
            {eventsLocal.map((event, index) => (
                <li key={event.title}>
                    <EventCard {...event} priority={index === 0} />
                </li>
            ))}
            <Suspense fallback={<li className="text-center text-gray-500">Loading more events...</li>}>
                <DbEvents />
            </Suspense>
        </ul>
    );
};

export default EventList;
