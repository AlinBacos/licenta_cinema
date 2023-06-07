import React from "react";
import { db } from "../database/firebase";
import { set, ref, onValue } from "firebase/database";
import { ref as sRef } from "firebase/storage";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getStorage, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../database/firebase";
import { useNavigate } from "react-router-dom";

function ScheduleEvents() {
  const [todoData, setTodoData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageNames, setImageNames] = useState([]);

  useEffect(() => {
    const imagesRef = sRef(storage, `events`);

    listAll(imagesRef)
      .then((res) => {
        const names = res.items.map((item) => item.name);
        setImageNames(names);
        return Promise.all(res.items.map((item) => getDownloadURL(item)));
      })
      .then((urls) => {
        setImageUrls(urls);
      });

    const countRef = ref(db, "event/");
    onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setTodoData(newPosts);
    });
  }, []);

  return (
    <div className="movie-schedule">
      {todoData.map((item, index) => {
        return (
          <div className="card">
            <div className="card-data">
              <h1>{item.title}</h1>
              <br></br>
              <h2>{item.hour}</h2>
              <h2>Date:{item.date}</h2>
              <h2>{item.description}</h2>
              <h2>Type:{item.type}</h2>
              <br></br>
            </div>
            {imageUrls.map((url, index) => {
              if (imageNames[index].includes(item.uid)) {
                return (
                  <div className="movie-poster">
                    <img
                      width="360px"
                      height="370px"
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
      })}
      ;
    </div>
  );
}

export default ScheduleEvents;
