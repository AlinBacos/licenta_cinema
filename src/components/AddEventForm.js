import React from "react";
import { useState } from "react";
import { storage } from "../database/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import "./components_style/AddEventForm.css";

function AddEventForm() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [eventType, setEventType] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [dateError, setDateError] = useState("");
  const [hourError, setHourError] = useState("");
  const [imageError, setImageError] = useState("");
  const [eventError, setEventError] = useState("");

  const eventArray = [
    { value: "Short Film", label: "Short Film" },
    { value: "Movie Night", label: "Movie Night" },
    { value: "Masterclass", label: "Masterclass" },
    { value: "Meet and greet", label: "Meet and greet" },
  ];

  const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
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

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const PostData = async (e) => {
    e.preventDefault();
    const uid = uuidv4();
    setImageError("");
    setTitleError("");
    setEventError("");
    setDescriptionError("");
    setDateError("");
    setHourError("");

    let valid = true;
    if (!image) {
      valid = false;
      setImageError("Image cannot be null");
    }

    if (!title) {
      valid = false;
      setTitleError("Title cannot be null");
    }

    if (!eventType) {
      valid = false;
      setEventError("Event type cannot be null");
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

    if (!valid) {
      return;
    } else {
      try {
        const res = await fetch(
          "https://authentication-firebase-19bfa-default-rtdb.firebaseio.com/event.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid,
              title,
              description,
              date,
              hour,
              eventType,
            }),
          }
        );
      } catch (error) {
        console.log(error);
      }

      try {
        const eventImageRef = ref(storage, `events/${uid}`);
        const uploadImage = await uploadBytes(eventImageRef, image);
      } catch (error) {
        console.log(error);
      }
      window.location.reload(false);
    }
  };

  return (
    <div className="add-event-component">
      <div className="add-event-form">
        <form>
          <label>Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className={imageError ? "errorImage" : ""}
            title={imageError}
          ></input>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title..."
            onChange={handleTitleChange}
            className={titleError ? "errorTitle" : ""}
            title={titleError}
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
            placeholder="Time..."
            onChange={handleHourChange}
            className={hourError ? "errorHour" : ""}
            title={hourError}
          />
          <label>Event type</label>
          <select
            value={eventType}
            onChange={handleEventTypeChange}
            className={eventError ? "errorEvent" : ""}
            title={eventError}
          >
            <option value="">Event</option>
            {eventArray.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button onClick={PostData}>Add Event</button>
        </form>
      </div>
    </div>
  );
}

export default AddEventForm;
