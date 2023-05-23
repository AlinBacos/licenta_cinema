import React from "react";
import "./components_style/PurchaseTicket.css";
import { db } from "../database/firebase";
import { set, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import StripeCheckout from "react-stripe-checkout";

function PurchaseTicket() {
  const [options, setOption] = useState([]);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [seatSelected, setSeatSelected] = useState(false);
  const [selected, setSelected] = useState([]);
  // const [todoData, setTodoData] = useState([]);

  const onToken = (token) => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token),
    }).then((response) => {
      response.json().then((data) => {
        alert(`We are in business`);
      });
    });
  };

  const [seats, setSeats] = useState(
    Array(64)
      .fill(null)
      .map(() => ({ state: "Not Selected" }))
  );

  const sendEmail = (e) => {
    const savedValue = localStorage.getItem("mySelect");
    const messageSent = `Movie: Jaws \n
    Date: 12/6/2023\n
    Seats number: ${savedValue}\n`;

    const params = {
      name: "alinbacos@yahoo.com",
      message: messageSent,
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
        <ul class="showcase">
          <li>
            <div class="seat-available"></div>
            <small>Available</small>
          </li>
          <li>
            <div class="seat-selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div class="seat-reserved"></div>
            <small>Reserved</small>
          </li>
        </ul>
        <div class="movie-room">
          <div class="screen"></div>
          <div class="seats-grid">
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
          </div>
        </div>
        <p>You have selected {numberOfSeats} seats</p>
        {/* <button onClick={handleSubmit}>Buy Ticket</button> */}
        <StripeCheckout
          token={onToken}
          name="You're just one step away from viewing the movie!"
          currency="ron"
          amount="1900"
          stripeKey="pk_test_51NAyZOK6WFoyNq8XTXUqWGcW4nJXf7N3s8T3ym7fVQJq0WqkBaHLw5wvF43HygtQogao1l3RBkukr3HjP21grHcs00blnOre0h"
        />
      </div>
    </div>
  );
}

export default PurchaseTicket;
