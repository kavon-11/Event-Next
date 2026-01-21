import { Suspense } from "react";
import ExploreBtn from "@/components/ExploreBtn";
import EventList from "@/components/EventList";

export default function Home() {
  return (
    <section>
      <h1 className="text-center">The Hub for every Dev <br /> Event You can&apos;t Miss </h1>
      <p className="text-center m-2">Haclathons , MeetUps , and MORE </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <Suspense fallback={<div className="text-center text-gray-500">Loading events...</div>}>
          <EventList />
        </Suspense>
      </div>
    </section>

  );
};