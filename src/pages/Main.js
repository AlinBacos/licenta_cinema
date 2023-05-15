import React from "react";
import "./pages_style/Main.css";
import Slideshow from "../components/Slideshow";
import MovieSchedule from "../components/MovieSchedule";
import Footer from "../components/Footer";

function Main() {
  return (
    <>
      <div className="main">
        <Slideshow />
      </div>
      <Footer />
    </>
  );
}

export default Main;
