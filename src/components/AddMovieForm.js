import React from 'react'
import "./components_style/AddMovieForm.css"
import { useState} from 'react'
import {storage} from '../database/firebase'
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function AddMovieForm() {
const [title,setTitle]= useState("");
const [year,setYear]= useState("");
const [genre,setGenre]= useState("");
const [director,setDirector]= useState("");
const [description,setDescription]= useState("");
const [price,setPrice]= useState("");
const [imageUpload, setImageUpload] = useState(null);

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const handleTitleChange = (e) =>{
  setTitle(e.target.value);
}

const handleYearChange = (e) =>{
  setYear(e.target.value);
}

const handleGenreChange = (e) =>{
  setGenre(e.target.value);
}

const handleDirectorChange = (e) =>{
  setDirector(e.target.value);
}

const handleDescriptionChange = (e) =>{
  setDescription(e.target.value);
}

const handlePriceChange = (e) =>{
  setPrice(e.target.value);
}

const handleImage = (e) =>{
  e.preventDefault();
  setImageUpload(e.target.files[0]);
}

// const uploadFile = async(e) =>{
//   if(imageUpload == null){
//     return;
//   }
//   const imageRef = ref(storage, `posters/${imageUpload.name}`);
//   uploadBytes(imageRef, imageUpload);
// }


const PostData =async(e)=>{
   e.preventDefault()
   const res=await fetch("https://authentication-firebase-19bfa-default-rtdb.firebaseio.com/movie.json",
   {
       method:'POST',
       headers:{
           'Content-Type':'application/json'
       },
       body:JSON.stringify({
        title,
        year,
        genre,
        director,
        description,
        price,
       })
    })
    const imageRef = ref(storage, `posters/${imageUpload.name}`);
    const upload=await uploadBytes(imageRef, imageUpload);
    window.location.reload(false);
  }

  return (
    <div className="add-movie-component">
      <div className="add-movie-form">
        <form>
            <label>Poster</label>
            <input type="file" onChange={handleImage}></input>
            <label>Title</label><br/>
            <input type="text" placeholder="Title..." onChange={handleTitleChange}></input><br/>
            <label>Year</label><br/>
            <input type="number" placeholder="Year..." onChange={handleYearChange}></input><br/>
            <label>Genre</label><br/>
            <input type="text" placeholder="Genre..." onChange={handleGenreChange}></input><br/>
            <label>Director</label><br/>
            <input type="text" placeholder="Director..." onChange={handleDirectorChange}></input><br/>
            <label>Description</label><br/>
            <input type="text" placeholder="Description..." onChange={handleDescriptionChange}></input><br/>
            <label>Ticket Price</label><br/>
            <input type="number" placeholder="Price..." onChange={handlePriceChange}></input><br/>
            <button onClick={PostData}>Add Movie</button><br/>
            {/* <button onClick={uploadFile}>Image</button> */}
        </form>
    </div>
    </div>
  )
}

export default AddMovieForm
