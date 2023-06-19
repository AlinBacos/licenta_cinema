import React from "react";
import "./components_style/Card.css";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Card({
  title,
  year,
  director,
  description,
  date,
  genre,
  image,
  trailer,
  duration,
  hour,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const navigate = useNavigate();

  const openModal = (videoId) => {
    setModalIsOpen(true);
    setVideoId(videoId);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setVideoId("");
  };

  const startIndexOfId = trailer.indexOf("v=") + 2;
  const id = trailer.substring(startIndexOfId);

  console.log(trailer);

  const redirectPurchase = () => {
    navigate("/PurchaseTicket", {
      state: { title: title, date: date, hour: hour },
    });
  };

  return (
    <div className="card-movie">
      <div className="movie-poster">
        <img width="300px" height="370px" src={image} />
      </div>
      <div className="info-movie">
        <p>{title}</p>
        <div className="details">
          <ul>
            <li>{year}</li>
            <li>{duration}</li>
            <li>{genre}</li>
          </ul>
        </div>
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
        <div className="buttons">
          <ul>
            <li>
              <button onClick={() => openModal(id)}>TICKET</button>
            </li>
            <li>
              <button id="purchase" onClick={redirectPurchase}>
                BUY TICKET
              </button>
              {/* <Link to={`/PurchaseTicket/${title}`}>PURCHASE</Link> */}
            </li>
          </ul>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "900px",
              height: "600px",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              border: "none",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <YouTube videoId={videoId} />
        </Modal>
      </div>
    </div>
  );
}

export default Card;
