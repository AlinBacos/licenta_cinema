import React from "react";
import "./components_style/AddMovieForm.css";
import { useState } from "react";
import { storage } from "../database/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddMovieForm() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
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

  const handleImage = (e) => {
    e.preventDefault();
    setImageUpload(e.target.files[0]);
  };

  const PostData = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://authentication-firebase-19bfa-default-rtdb.firebaseio.com/movie.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          year,
          genre,
          director,
          description,
          date,
        }),
      }
    );

    const imageRef = ref(storage, `posters/${imageUpload.name}`);
    const upload = await uploadBytes(imageRef, imageUpload);
    window.location.reload(false);
  };

  return (
    <div className="add-movie-component">
      <div className="add-movie-form">
        <form>
          <label>Poster</label>
          <input type="file" onChange={handleImage}></input>
          <label>Title</label>
          <br />
          <input
            type="text"
            placeholder="Title..."
            onChange={handleTitleChange}
          ></input>
          <br />
          <label>Year</label>
          <br />
          <input
            type="number"
            placeholder="Year..."
            onChange={handleYearChange}
          ></input>
          <br />
          <label>Genre</label>
          <br />
          {/* <input
            type="text"
            placeholder="Genre..."
            onChange={handleGenreChange}
          ></input> */}
          <select value={selectedValue} onChange={handleSelectChange}>
            <option value="">Select an option</option>
            <option value="Horror">Horror</option>
            <option value="History">History</option>
            <option value="Crime">Crime</option>
            <option value="Thriller">Thriller</option>
            <option value="Dark Fantasy">Dark Fantasy</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="Comedy">Comedy</option>
          </select>
          <br />
          <label>Director</label>
          <br />
          <input
            type="text"
            placeholder="Director..."
            onChange={handleDirectorChange}
          ></input>
          <br />
          <label>Description</label>
          <br />
          <input
            type="text"
            placeholder="Description..."
            onChange={handleDescriptionChange}
          ></input>
          <br />
          <label>Date</label>
          <br />
          <input
            type="date"
            placeholder="Date..."
            onChange={handleDateChange}
          ></input>
          <br />
          <button onClick={PostData}>Add Movie</button>
          <br />
        </form>
      </div>
    </div>
  );
}

export default AddMovieForm;
