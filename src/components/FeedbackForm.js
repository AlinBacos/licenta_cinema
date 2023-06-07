import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./components_style/FeedbackForm.css";

function FeedbackForm() {
  const form = useRef();

  const [soundQuality, setSoundQuality] = useState("");
  const [screenQuality, setScreenQuality] = useState("");
  const [technicalIssues, setTechnicalIssues] = useState("");
  const [improvements, setImprovements] = useState("");
  const [rating, setRating] = useState("");

  const handleSoundQualityChange = (e) => {
    setSoundQuality(e.target.value);
  };

  const handleScreenQualityChange = (e) => {
    setScreenQuality(e.target.value);
  };

  const handleTechnicalIssuesChange = (e) => {
    setTechnicalIssues(e.target.value);
  };

  const handleImprovementsChange = (e) => {
    setImprovements(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const content = `How was the sound quality?\n
    ${soundQuality}\n
    How was the screen quality?\n
    ${screenQuality}\n
    Were there any technical issues?\n
    ${technicalIssues}\n
    Tell us what we can improve!\n
    ${improvements}\n
    Rate your experience from 1 to 10!\n
    ${rating}\n`;

    const params = {
      to_email: "alinbacos@yahoo.com",
      message: content,
    };

    emailjs
      .send("service_u6lnfgo", "template_q5q03zq", params, "Dl7p4JQNofDkWlhjl")
      .then(
        (result) => {
          alert("Thank you for offering your input!");
          window.location.reload(false);
        },
        (error) => {
          alert(
            "An unexpected error occured while trying to send your feedback!"
          );
          window.location.reload(false);
        }
      );
  };

  return (
    <div className="feedback-div">
      <div className="feedback-form">
        <form ref={form} onSubmit={sendEmail}>
          <label>Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="Enter your email"
          />
          <label>How was the sound quality?</label>
          <input
            type="text"
            placeholder="Type your answer here"
            onChange={handleSoundQualityChange}
          />
          <label>How was the screen quality?</label>
          <input
            type="text"
            placeholder="Type your answer here"
            onChange={handleScreenQualityChange}
          />
          <label>Were there any technical issues?</label>
          <input
            type="text"
            placeholder="Type your answer here"
            onChange={handleTechnicalIssuesChange}
          />
          <label>Tell us what we can improve!</label>
          <input
            type="text"
            placeholder="Type your answer here"
            onChange={handleImprovementsChange}
          />
          <label>Rate your experience from 1 to 10!</label>
          <input
            type="text"
            placeholder="Type your answer here"
            onChange={handleRatingChange}
          />
          <input id="submit" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
