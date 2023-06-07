import React, { useContext } from "react";
import { useState } from "react";
import { storage } from "../database/firebase";
import { ref, uploadBytes } from "firebase/storage";
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

    const moviePosterRef = ref(storage, `posters/${uid}`);
    const uploadPoster = await uploadBytes(moviePosterRef, image);
    window.location.reload(false);
  };

  return (
    <div className="add-movie-component">
      <div className="add-movie-form">
        <form>
          <label>Poster</label>
          <input type="file" onChange={handleImage} />
          <label>Title</label>
          <input
            type="text"
            placeholder="Title..."
            onChange={handleTitleChange}
          />
          <label>Year</label>
          <input
            type="number"
            placeholder="Year..."
            onChange={handleYearChange}
          />
          <label>Genre</label>
          <select value={genre} onChange={handleGenreChange}>
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
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Description..."
            onChange={handleDescriptionChange}
          />
          <label>Date</label>
          <input
            type="date"
            placeholder="Date..."
            onChange={handleDateChange}
          />
          <label>Hour</label>
          <input
            type="time"
            placeholder="Hour..."
            onChange={handleHourChange}
          />
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration..."
            onChange={handledDurationChange}
          />
          <label>Trailer Link</label>
          <input
            type="text"
            placeholder="Date..."
            onChange={handleTrailerChange}
          />
          <button onClick={PostData}>Add Movie</button>
        </form>
      </div>
    </div>
  );
}

export default AddMovieForm;
