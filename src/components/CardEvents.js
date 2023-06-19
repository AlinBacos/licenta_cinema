import React from "react";
import "./components_style/CardEvents.css";
// import Modal from "react-modal";
import { useState } from "react";

function CardEvents({ image, title, description, date, hour, eventType }) {
  return (
    <div className="card-event">
      <div className="background">
        <img width="600px" height="370px" src={image} />
      </div>
      <div className="info-event">
        <p>{title}</p>
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="date_hour">
          <ul>
            <li>
              <b>Date:</b> {date}
            </li>
            <li>
              <b>Hour:</b> {hour}
            </li>
          </ul>
        </div>
        <div className="type">
          <p>{eventType}</p>
        </div>
      </div>
    </div>
  );
}

export default CardEvents;
