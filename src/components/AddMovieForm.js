import React, { useContext } from "react";
import { useState } from "react";
import { storage } from "../database/firebase";
import { set, ref as dbref, push } from "firebase/database";
import { ref, uploadBytes } from "firebase/storage";
import { db } from "../database/firebase";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "./AuthContext";
import "./components_style/AddMovieForm.css";

function AddMovieForm() {
  const currentUser = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [duration, setDuration] = useState("");
  const [trailer, setTrailer] = useState("");
  const array = Array(64).fill("available");
  const [error, setError] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [yearError, setYearError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [directorError, setDirectorError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [dateError, setDateError] = useState("");
  const [hourError, setHourError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [trailerError, setTrailerError] = useState("");
  const [imageError, setImageError] = useState("");

  const genreArray = [
    { value: "Horror", label: "Horror" },
    { value: "History", label: "History" },
    { value: "Crime", label: "Crime" },
    { value: "Thriller", label: "Thriller" },
    { value: "Dark Fantasy", label: "Dark Fantasy" },
    { value: "Drama", label: "Drama" },
    { value: "Romance", label: "Romance" },
    { value: "Comedy", label: "Comedy" },
  ];

  const handleImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleDirectorChange = (e) => {
    setDirector(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleHourChange = (e) => {
    setHour(e.target.value);
  };

  const handledDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleTrailerChange = (e) => {
    setTrailer(e.target.value);
  };

  const PostData = async (e) => {
    e.preventDefault();
    const uid = uuidv4();
    setImageError("");
    setTitleError("");
    setYearError("");
    setGenreError("");
    setDirectorError("");
    setDescriptionError("");
    setDateError("");
    setHourError("");
    setDurationError("");
    setTrailerError("");

    let valid = true;
    if (!image) {
      valid = false;
      setImageError("Image cannot be null");
    }

    if (!title) {
      valid = false;
      setTitleError("Title cannot be null");
    }

    if (year < 1895) {
      valid = false;
      setYearError("Year must be above 1895");
    }

    if (!genre) {
      valid = false;
      setGenreError("Genre cannot be null");
    }

    if (!director) {
      valid = false;
      setDirectorError("Director cannot be null");
    }

    if (!description) {
      valid = false;
      setDescriptionError("Description cannot be null");
    }

    if (!date) {
      valid = false;
      setDateError("Date cannot be null");
    } else if (date <= new Date()) {
      valid = false;
      setDateError("Date must be in the future");
    }
    if (!hour) {
      valid = false;
      setHourError("Hour cannot be null");
    }

    if (!duration) {
      valid = false;
      setDurationError("Duration cannot be null");
    }
    if (!trailer) {
      valid = false;
      setTrailerError("Trailer cannot be null");
    }

    if (!valid) {
      return;
    } else {
      try {
        const res = await fetch(
          "https://authentication-firebase-19bfa-default-rtdb.firebaseio.com/movie.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid,
              title,
              year,
              genre,
              director,
              description,
              date,
              hour,
              duration,
              trailer,
            }),
          }
        );
      } catch (error) {
        console.log(error);
      }

      try {
        const res = await fetch(
          "https://authentication-firebase-19bfa-default-rtdb.firebaseio.com/reservation.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              array,
            }),
          }
        );
      } catch (error) {
        console.log(error);
      }

      try {
        const moviePosterRef = ref(storage, `posters/${uid}`);
        const uploadPoster = await uploadBytes(moviePosterRef, image);
      } catch (error) {
        console.log(error);
      }
      window.location.reload(false);
    }
  };

  return (
    <div className="add-movie-component">
      <div className="add-movie-form">
        <form>
          <label>Poster</label>
          <input
            type="file"
            onChange={handleImage}
            className={imageError ? "errorImage" : ""}
            title={imageError}
          />
          <label>Title</label>
          <input
            type="text"
            placeholder="Title..."
            onChange={handleTitleChange}
            className={titleError ? "errorTitle" : ""}
            title={titleError}
          />
          <label>Year</label>
          <input
            type="number"
            placeholder="Year..."
            onChange={handleYearChange}
            className={yearError ? "errorYear" : ""}
            title={yearError}
          />
          <label>Genre</label>
          <select
            value={genre}
            onChange={handleGenreChange}
            className={genreError ? "errorGenre" : ""}
            title={genreError}
          >
            <option value="">Genre</option>
            {genreArray.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label>Director</label>
          <input
            type="text"
            placeholder="Director..."
            onChange={handleDirectorChange}
            className={directorError ? "errorDirector" : ""}
            title={directorError}
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Description..."
            onChange={handleDescriptionChange}
            className={descriptionError ? "errorDescription" : ""}
            title={descriptionError}
          />
          <label>Date</label>
          <input
            type="date"
            placeholder="Date..."
            onChange={handleDateChange}
            className={dateError ? "errorDate" : ""}
            title={dateError}
          />
          <label>Hour</label>
          <input
            type="time"
            placeholder="Hour..."
            onChange={handleHourChange}
            className={hourError ? "errorHour" : ""}
            title={hourError}
          />
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration..."
            onChange={handledDurationChange}
            className={durationError ? "errorDuration" : ""}
            title={durationError}
          />
          <label>Trailer Link</label>
          <input
            type="text"
            placeholder="Date..."
            onChange={handleTrailerChange}
            className={trailerError ? "errorTrailer" : ""}
            title={trailerError}
          />
          <button onClick={PostData}>Add Movie</button>
        </form>
      </div>
    </div>
  );
}

export default AddMovieForm;
