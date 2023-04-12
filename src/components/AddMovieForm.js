import React from 'react'
import "./components_style/AddMovieForm.css"

export default function AddMovieForm() {
  return (
    <div className="add-movie-component">
      <div className="add-movie-form">
        <form>
            <label>Poster</label><br/>
            <input type="text" placeholder="Add Poster"></input><br/>
            <label>Movie Name</label><br/>
            <input type="text" placeholder="Enter Movie Name"></input><br/>
            <label>Description</label><br/>
            <input type="text" placeholder="Write a description"></input><br/>
            <label>Director Name</label><br/>
            <input type="text" placeholder="Director Name"></input><br/>
            <label>Ticket Price</label><br/>
            <input type="text" placeholder="Ticket Price"></input><br/>
            <input type="button" value="Add Movie"></input><br/>
        </form>
    </div>
    </div>
  )
}
