import ExploreBtn from "@/components/ExploreBtn";
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
      {[1, 2, 3,4,5].map((event) => (
       <li key={event} className="event-card">
        <h4>Event Title {event}</h4>
        <p>Date: 2024-0{event}-15</p>
        <p>Location: City {event}</p>
       </li>
      ))}
     </ul>
    </div>
 </section>
 
  );
};
export default Home;