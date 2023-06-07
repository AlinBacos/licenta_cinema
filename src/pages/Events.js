import React from "react";
import "./pages_style/Events.css";
import ScheduleEvents from "../components/ScheduleEvents";
import Footer from "../components/Footer";

function Events() {
  return (
    <>
      <div className="events">
        <ScheduleEvents />
      </div>
      <Footer />
    </>
  );
}

export default Events;
