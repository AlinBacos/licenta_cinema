import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./components_style/FeedbackForm.css";

function FeedbackForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_u6lnfgo",
        "template_zvlql9b",
        form.current,
        "Dl7p4JQNofDkWlhjl"
      )
      .then(
        (result) => {
          alert("Thank you for helping us offer you a better experience! :)");
          window.location.reload(false);
        },
        (error) => {
          alert("An error occured while trying to send the feedback! :( ");
          window.location.reload(false);
        }
      );
  };

  return (
    <div className="feedback-div">
      <div className="feedback-form">
        <form ref={form} onSubmit={sendEmail}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="user_email"
            placeholder="Enter your email"
          ></input>
          <br />
          <label>Type your feedback down below</label>
          <br />
          <textarea id="message" type="text" name="message"></textarea>
          <br />
          <input id="submit" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
