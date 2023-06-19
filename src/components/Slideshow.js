import React from "react";
import Carousel from "react-elastic-carousel";
import { db } from "../database/firebase";
import { ref, onValue } from "firebase/database";
import { ref as sRef } from "firebase/storage";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../database/firebase";
import { useNavigate } from "react-router-dom";
import CardEvents from "./CardEvents";

export default function Slideshow() {
  const breakPoints = [{ width: 1, itemsToShow: 1 }];
  const [todoData, setTodoData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const imagesRef = sRef(storage, `events`);

    listAll(imagesRef)
      .then((res) => {
        const names = res.items.map((item) => item.name);
        setImageNames(names);
        return Promise.all(res.items.map((item) => getDownloadURL(item)));
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((urls) => {
        setImageUrls(urls);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });

    const countRef = ref(db, "event/");
    onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newPosts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTodoData(newPosts);
      } else {
        setTodoData([]);
      }
    });
  }, []);

  const matchImage = () => {
    todoData.map((item, index) => {
      imageUrls.map((url, index) => {
        if (imageNames[index].includes(item.uid)) {
          item.imageUrl = url;
        }
      });
    });
  };

  matchImage();

  return (
    <>
      <div className="Slideshow">
        <br></br>
        <br></br>
        <br></br>
        <div className="Carousel">
          <Carousel breakPoints={breakPoints} enableAutoPlay={true}>
            {todoData.map((item, index) => {
              return (
                <CardEvents
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  image={item.imageUrl}
                  hour={item.hour}
                  eventType={item.eventType}
                />
              );
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
}
