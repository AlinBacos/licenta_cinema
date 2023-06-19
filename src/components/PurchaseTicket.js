import React, { useContext } from "react";
import "./components_style/PurchaseTicket.css";
import { db } from "../database/firebase";
import { set, ref, push, onValue } from "firebase/database";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import StripeCheckout from "react-stripe-checkout";
import { v4 as uuidv4 } from "uuid";
import jsPDF from "jspdf";
import QRCode from "qrcode-svg";
import domtoimage from "dom-to-image";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const qrCodeGenerator = require("qrcode");

function PurchaseTicket() {
  const [options, setOption] = useState([]);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [seatSelected, setSeatSelected] = useState(false);
  const [selected, setSelected] = useState([]);
  const uniqueValue = uuidv4();
  const currentUser = useContext(AuthContext);

  const amount = 50;

  const [states, setStates] = useState([]);
  const [filterName, setFilterName] = useState("");

  const [reservationData, setReservationData] = useState([]);
  const [id, setId] = useState("");
  const location = useLocation();
  const title = location.state?.title;
  const date = location.state?.date;
  const hour = location.state?.hour;

  const onToken = (token) => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token),
    }).then((response) => {
      response.json().then((data) => {
        alert(`We are in business`);
      });
    });
    sendEmail();
  };

  const sendEmail = async () => {
    const qrData = uniqueValue;
    const qrCodeDataUrl = await qrCodeGenerator.toDataURL(qrData);

    const savedValue = localStorage.getItem("mySelect");
    const messageSent = `Movie: ${title} \n
    Date: ${date}\n
    Time: ${hour}\n
    Seats number: ${savedValue}\n`;

    const params = {
      from_name: "Royal Cinema",
      to_email: `${currentUser.email}`,
      message: messageSent,
      attachment: qrCodeDataUrl,
    };
    try {
      emailjs
        .send(
          "service_u6lnfgo",
          "template_zvlql9b",
          params,
          "Dl7p4JQNofDkWlhjl"
        )
        .then(
          (result) => {
            console.log("Success");
          },
          (error) => {
            console.log("Error");
          }
        );
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await fetch(
        "https://authentication-firebase-19bfa-default-rtdb.firebaseio.com/qrcode.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qrData,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const movieRef = ref(db, "movie/");
    onValue(movieRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataPost = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setOption(dataPost);
      } else {
        setOption([]);
      }
    });

    const reservationRef = ref(db, "reservation/");
    onValue(reservationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataPost = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setReservationData(dataPost);
      } else {
        setReservationData([]);
      }
    });
  }, []);

  const handleSeatClick = (movieIndex, seatIndex, id) => {
    setId(id);
    const updatedReservationData = [...reservationData];

    if (updatedReservationData[movieIndex].array[seatIndex] === "purchased") {
      return;
    }

    updatedReservationData[movieIndex].array[seatIndex] =
      updatedReservationData[movieIndex].array[seatIndex] === "available"
        ? "purchased"
        : "available";
    setReservationData(updatedReservationData);
    setNumberOfSeats((prevSeats) =>
      updatedReservationData[movieIndex].array[seatIndex] === "available"
        ? prevSeats - 1
        : prevSeats + 1
    );
    setSeatSelected(true);

    const updatedSelected = [...selected, seatIndex];
    setSelected(updatedSelected);
    localStorage.setItem("mySelect", updatedSelected);
  };

  const handleUpdateSeats = () => {
    const seatsRef = ref(db, `reservation/${id}/array`);
    const indexMovie = reservationData.findIndex(
      (movie) => movie.title === title
    );
    set(seatsRef, reservationData[indexMovie].array)
      .then(() => {
        console.log("The Seats selected were updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the seats", error);
      });
  };

  return (
    <div className="purchase-ticket">
      <div className="reservation">
        <label>Movie: {title}</label>
        <label>Date: {date}</label>
        <label>Hour: {hour}</label>
        <select>
          <option value="15">Student 15 RON</option>
          <option value="25">Adult 25 RON</option>
          <option value="10">Child 10 RON</option>
        </select>
        <br></br>
        <ul className="showcase">
          <li>
            <div className="seat-available"></div>
            <small>Available</small>
          </li>
          <li>
            <div className="seat-selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div className="seat-reserved"></div>
            <small>Reserved</small>
          </li>
        </ul>
        <div className="movie-room">
          <div className="screen"></div>
          <div className="seats-grid">
            {reservationData.map((item, index) => {
              if (item.title.includes(title)) {
                console.log(index);
                console.log(item.id);
                return item.array.map((state, seatIndex) => (
                  <div
                    key={seatIndex}
                    className="seats"
                    style={{
                      backgroundColor: state === "available" ? "green" : "red",
                      cursor: "pointer",
                      color: "black",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleSeatClick(index, seatIndex, item.id)}
                  >
                    <p>{seatIndex}</p>
                  </div>
                ));
              }
              return null;
            })}
          </div>
        </div>
        <p>You have selected {numberOfSeats} seats</p>
        <StripeCheckout
          token={onToken}
          name="You're just one step away from viewing the movie!"
          currency="RON"
          amount="1900"
          stripeKey="pk_test_51NAyZOK6WFoyNq8XTXUqWGcW4nJXf7N3s8T3ym7fVQJq0WqkBaHLw5wvF43HygtQogao1l3RBkukr3HjP21grHcs00blnOre0h"
        />
      </div>
    </div>
  );
}

export default PurchaseTicket;
