import React from "react";
import "./pages_style/Main.css";
import Slideshow from "../components/Slideshow";
import MovieSchedule from "../components/MovieSchedule";
import Footer from "../components/Footer";
import ticket from "../images/ticket.jpg";
import popcorn from "../images/popcorn.jpg";
import projector from "../images/projector.png";

function Main() {
  return (
    <>
      <div className="main">
        <Slideshow />
        <div class="container">
          <h1>Welcome to our Movie Theater</h1>
          <div class="circles">
            <div class="circle">
              <img src={ticket} />
              <h2>Tickets</h2>
              <p>
                Purchase your ticket right now online, you won't have to worry
                about waiting in line again.
              </p>
            </div>

            <div class="circle">
              <img src={popcorn} />
              <h2>Snacks</h2>
              <p>
                Bring your own popcorn or any snacks you want, try not to make a
                mess in the movie room!
              </p>
            </div>

            <div class="circle">
              <img src={projector} />
              <h2>Movie</h2>
              <p>
                Enjoy your cinematic experience, hope you have a good time and
                we'll see you soon!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Main;
