import React from "react";
import "./components_style/Card.css";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { useState } from "react";

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

  return (
    <div className="card">
      <div className="movie-poster">
        <img width="300px" height="370px" src={image} />
      </div>
      <div className="info">
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
              <button onClick={() => openModal(id)}>View Trailer</button>
            </li>
            <li>
              <button>Review</button>
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

      {/* <div className="card-data">
        <h1>{title}</h1>
        <br></br>
        <h2>{year}</h2>
        <h2>Directed by:{director}</h2>
        <h2>{description}</h2>
        <h2>Date:{date}</h2>
        <br></br>
        <h3>{genre}</h3>
        <br></br>
        <button onClick={() => openModal(id)}>Watch Trailer</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "700px",
              height: "600px",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "pink",
              border: "none",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <YouTube videoId={videoId} />
        </Modal>
      </div> */}
    </div>
  );
}

export default Card;
