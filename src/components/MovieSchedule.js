import React from "react";
import "./components_style/MovieSchedule.css";
import { db } from "../database/firebase";
import { set, ref, onValue } from "firebase/database";
import { ref as sRef } from "firebase/storage";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getStorage, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../database/firebase";

function MovieSchedule() {
  const [todoData, setTodoData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [text, setText] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [imageNames, setImageNames] = useState([]);

  useEffect(() => {
    const imagesRef = sRef(storage, `posters`);

    listAll(imagesRef)
      .then((res) => {
        const names = res.items.map((item) => item.name);
        setImageNames(names);
        return Promise.all(res.items.map((item) => getDownloadURL(item)));
      })
      .then((urls) => {
        setImageUrls(urls);
      });
    const countRef = ref(db, "movie/");
    onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setTodoData(newPosts);
    });
  }, []);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const selectMonday = (event) => {
    setWeekDay("Monday");
  };
  const selectTuesday = (event) => {
    setWeekDay("Tuesday");
  };
  const selectWednesday = (event) => {
    setWeekDay("Wednesday");
  };
  const selectThursday = (event) => {
    setWeekDay("Thursday");
  };
  const selectFriday = (event) => {
    setWeekDay("Friday");
  };
  const selectSaturday = (event) => {
    setWeekDay("Saturday");
  };
  const selectSunday = (event) => {
    setWeekDay("Sunday");
  };

  return (
    <div className="movie-schedule">
      {/* <div>
        <select value={selectedValue} onChange={handleSelectChange}>
          <option value="">Select an option</option>
          <option value="Horror">Horror</option>
          <option value="History">History</option>
          <option value="Crime">Crime</option>
        </select>
      </div> */}
      <div className="week-days">
        <ul>
          <li>
            <button onClick={selectMonday}>Monday</button>
          </li>
          <li>
            <button onClick={selectTuesday}>Tuesday</button>
          </li>
          <li>
            <button onClick={selectWednesday}>Wednesday</button>
          </li>
          <li>
            <button onClick={selectThursday}>Thursday</button>
          </li>
          <li>
            <button onClick={selectFriday}>Friday</button>
          </li>
          <li>
            <button onClick={selectSaturday}>Saturday</button>
          </li>
          <li>
            <button onClick={selectSunday}>Sunday</button>
          </li>
          <li>
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
          </li>
        </ul>
      </div>
      {todoData.map((item, index) => {
        const date = new Date(item.date);
        const weekday = format(date, "EEEE");
        console.log(weekday);
        if (item.genre.includes(selectedValue) && weekday.includes(weekDay)) {
          return (
            <div className="card">
              <div className="card-data">
                <h1>{item.title}</h1>
                <h1>{item.year}</h1>
                <h1>Genre:{item.genre}</h1>
                <h1>Directed by:{item.director}</h1>
                <h1>{item.description}</h1>
                <h1>Date:{item.date}</h1>
              </div>
              {imageUrls.map((url, index) => {
                imageNames[index] = imageNames[index].replace(
                  /([a-z])(?=[A-Z])/g,
                  "$1 "
                );
                if (imageNames[index].includes(item.title)) {
                  return (
                    <div className="movie-poster">
                      <img
                        width="360px"
                        height="360px"
                        key={index}
                        src={url}
                        alt={imageNames[index]}
                      />
                    </div>
                  );
                }
              })}
            </div>
          );
        } else {
          if (selectedValue === null) {
            return (
              <div className="card">
                <h1>{item.title}</h1>
                <h1>{item.year}</h1>
                <h1>Genre:{item.genre}</h1>
                <h1>Directed by:{item.director}</h1>
                <h1>{item.description}</h1>
                <h1>Ticket price:{item.price}</h1>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default MovieSchedule;
