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

  const [soundQualityError, setSoundQualityError] = useState("");
  const [screenQualityError, setScreenQualityError] = useState("");
  const [technicalIssuesError, setTechnicalIssuesError] = useState("");
  const [improvementsError, setImprovementsError] = useState("");
  const [ratingError, setRatingError] = useState("");

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

    setSoundQualityError("");
    setScreenQualityError("");
    setTechnicalIssuesError("");
    setImprovementsError("");
    setRatingError("");

    let valid = true;
    if (!soundQuality || soundQuality.length > 50) {
      valid = false;
      setSoundQualityError("Input must be 50 characters or less");
    }

    if (!screenQuality || screenQuality.length > 50) {
      valid = false;
      setScreenQualityError("Input must be 50 characters or less");
    }

    if (!technicalIssues || technicalIssues.length > 50) {
      valid = false;
      setTechnicalIssuesError("Input must be 50 characters or less");
    }

    if (!improvements || improvements.length > 250) {
      valid = false;
      setImprovementsError("Input must be 250 characters or less");
    }

    if (!rating) {
      valid = false;
      setRatingError("Input cannot be null");
    }

    if (!valid) {
      return;
    } else {
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

      try {
        emailjs
          .send(
            "service_u6lnfgo",
            "template_q5q03zq",
            params,
            "Dl7p4JQNofDkWlhjl"
          )
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="feedback-div">
      <div className="feedback-form">
        <form ref={form} onSubmit={sendEmail}>
          <label>How was the sound quality?</label>
          <input
            type="text"
            placeholder="Type your answer here"
            onChange={handleSoundQualityChange}
            className={soundQualityError ? "errorSoundQuality" : ""}
            title={soundQualityError}
          />
          <label>How was the screen quality?</label>
          <input
            type="text"
            placeholder="Type your answer here"
            onChange={handleScreenQualityChange}
            className={screenQualityError ? "errorScreenQuality" : ""}
            title={screenQualityError}
          />
          <label>Were there any technical issues?</label>
          <input
            type="text"
            placeholder="Type your answer here"
            onChange={handleTechnicalIssuesChange}
            className={technicalIssuesError ? "errorTechnicalIssues" : ""}
            title={technicalIssuesError}
          />
          <label>Tell us what we can improve!</label>
          <input
            type="text"
            placeholder="Type your answer here"
            onChange={handleImprovementsChange}
            className={improvementsError ? "errorImprovements" : ""}
            title={improvementsError}
          />
          <label>Rate your experience from 1 to 10!</label>
          <input
            type="text"
            placeholder="Type your answer here"
            onChange={handleRatingChange}
            className={ratingError ? "errorRating" : ""}
            title={ratingError}
          />
          <input id="submit" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
