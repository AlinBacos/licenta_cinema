import React from "react";
import "./pages_style/Schedule.css";
import MovieSchedule from "../components/MovieSchedule";
import Footer from "../components/Footer";

function Schedule() {
  return (
    <>
      <div className="schedule">
        <MovieSchedule />
      </div>
      <Footer />
    </>
  );
}

export default Schedule;
