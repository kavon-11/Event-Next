import ExploreBtn from "@/components/ExploreBtn";
import EventCard, { EventCardProps } from "@/components/EventCard";
import { cacheLife } from "next/cache";
import { eventsLocal } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const Home = async () => {
  'use cache'
  cacheLife('hours');
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  const allEvents = [...eventsLocal, ...(events || [])];

  return (
    <section>
      <h1 className="text-center">The Hub for every Dev <br /> Event You can&apos;t Miss </h1>
      <p className="text-center m-2">Haclathons , MeetUps , and MORE </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events" style={{ listStyle: "none" }}>
          {allEvents && allEvents.length > 0 && allEvents.map((event: EventCardProps) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>

  );
};
export default Home;