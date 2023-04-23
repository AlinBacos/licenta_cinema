import React from 'react'
import "./components_style/MovieSchedule.css";
import {db} from "../database/firebase";
import {set,ref, onValue} from "firebase/database";
import {useState, useEffect} from "react";

function MovieSchedule() {
  const[todoData, setTodoData] = useState([])

  useEffect(()=>{
    const countRef= ref(db,'movie/');
    onValue(countRef,(snapshot)=>{
      const data = snapshot.val();
      const newPosts = Object.keys(data).map(key=> ({
          id:key,
          ...data[key]
        }));
        setTodoData(newPosts);
    });
  },[]);

  return (
    <div className="movie-schedule">
      {
        todoData.map((item,index)=>{
          return(
            <div className="card">
            <h1>{item.title}</h1>
            <h1>{item.year}</h1>
            <h1>Genre:{item.genre}</h1>
            <h1>Directed by:{item.director}</h1>
            <h1>{item.description}</h1>
            <h1>Ticket price:{item.price}</h1>
            </div>
          )
        })
      }
    </div>
  );
}

export default MovieSchedule