import React from 'react'
import "./components_style/AddMovieForm.css"
import { useState} from 'react'

function AddMovieForm() {
// const [details, setDetails] = useState({
//     title:'',
//     year:'',
//     genre:'',
//     director:'',
//     description:'',
//     price:'',  
// })
const [title,setTitle]= useState("");
const [year,setYear]= useState("");
const [genre,setGenre]= useState("");
const [director,setDirector]= useState("");
const [description,setDescription]= useState("");
const [price,setPrice]= useState("");

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

const PostData =async(e)=>{
   e.preventDefault()

  //  const{title,year,genre,director,description,price}=details;
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
    window.location.reload(false);
  }

  return (
    <div className="add-movie-component">
      <div className="add-movie-form">
        <form>
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
        </form>
    </div>
    </div>
  )
}

export default AddMovieForm
