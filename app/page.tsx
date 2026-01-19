
"use client"; 
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {events} from "@/lib/constants";

const Home = () => {
  console.log("Event Page");
  return (
 <section>
  <h1 className="text-center">The Hub for every Dev <br /> Event You can&apos;t Miss </h1>
<p className="text-center m-2">Haclathons , MeetUps , and MORE </p>
<ExploreBtn />

    <div className="mt-20 space-y-7">
     <h3>Featured Events</h3>

     <ul className="events" style={{ listStyle: "none" }}>
      {events.map((event) => (
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