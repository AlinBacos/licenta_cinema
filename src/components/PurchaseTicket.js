import React from "react";
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

const qrCodeGenerator = require("qrcode");

function PurchaseTicket() {
  const [options, setOption] = useState([]);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [seatSelected, setSeatSelected] = useState(false);
  const [selected, setSelected] = useState([]);
  const uniqueValue = uuidv4();

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

  const [seats, setSeats] = useState(
    Array(64)
      .fill(null)
      .map(() => ({ state: "Not Selected" }))
  );

  const sendEmail = async () => {
    const qrData = uniqueValue;
    console.log(qrData);
    const qrCodeDataUrl = await qrCodeGenerator.toDataURL(qrData);

    const savedValue = localStorage.getItem("mySelect");
    const messageSent = `Movie: Jaws \n
    Date: 12/6/2023\n
    Seats number: ${savedValue}\n`;

    const params = {
      from_name: "Zizy's Cinema",
      to_email: "gamesaccount14@yahoo.ro",
      message: messageSent,
      attachment: qrCodeDataUrl,
    };

    emailjs
      .send("service_u6lnfgo", "template_zvlql9b", params, "Dl7p4JQNofDkWlhjl")
      .then(
        (result) => {
          alert("Your ticket was sent to your email! :)");
          window.location.reload(false);
        },
        (error) => {
          alert("An error occured! :( ");
          window.location.reload(false);
        }
      );

    const databaseRef = ref(db, "qrcode");
    const newChildRef = push(databaseRef);
    set(newChildRef, qrData)
      .then(() => {
        console.log("Number saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving number:", error);
      });
  };

  const handleSeatClick = (seatIndex) => {
    const updatedSeats = [...seats];
    updatedSeats[seatIndex].state = "Reserved";
    const update = [...selected, seatIndex];
    setSeats(updatedSeats);
    setSelected(update);
    localStorage.setItem("mySelect", update);
    setNumberOfSeats(numberOfSeats + 1);
  };

  const handleSubmit = async () => {
    sendEmail();
    try {
      const selectedOption = document.getElementById("selection").value;
      const seatsRef = ref(db, `reservations/${selectedOption}`);
      await set(seatsRef, seats);
      console.log("Seats sent to Firebase successfully!");
    } catch (error) {
      console.error("Error sending seats to Firebase:", error);
    }
  };

  useEffect(() => {
    const countRef = ref(db, "movie/");
    onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setOption(newPosts);
    });

    // const reservationRef = ref(db, "reservation/");
    // onValue(reservationRef, (snapshot) => {
    //   const data = snapshot.val();
    //   const newPosts = Object.keys(data).map((key) => ({
    //     id: key,
    //     ...data[key],
    //   }));
    //   setTodoData(newPosts);
    // });
  }, []);

  return (
    <div className="purchase-ticket">
      <div className="reservation">
        <label>Select a movie:</label>
        <select id="selection">
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
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
            {seats.map((seat, index) => (
              <div
                className="seats"
                key={index}
                onClick={() => handleSeatClick(index)}
                style={{
                  backgroundColor:
                    seat.state === "Not Selected" ? "white" : "green",
                  cursor: "pointer",
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {index}
              </div>
            ))}
            {/* <QRCode value={uniqueValue} /> */}
          </div>
        </div>
        <p>You have selected {numberOfSeats} seats</p>
        <button onClick={sendEmail}>Buy Ticket</button>
        {/* <StripeCheckout
          token={onToken}
          name="You're just one step away from viewing the movie!"
          currency="ron"
          amount="1900"
          stripeKey="pk_test_51NAyZOK6WFoyNq8XTXUqWGcW4nJXf7N3s8T3ym7fVQJq0WqkBaHLw5wvF43HygtQogao1l3RBkukr3HjP21grHcs00blnOre0h"
        /> */}
      </div>
    </div>
  );
}

export default PurchaseTicket;
