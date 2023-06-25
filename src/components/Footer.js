import React from "react";
import "./components_style/Footer.css";
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import linkedin from "../images/linkedin.png";

function Footer() {
  return (
    <div className="footer-bg">
      <div className="footer">
        <div className="social-icons">
          <img src={facebook} style={{ height: "30px", width: "30px" }} />
          <img src={instagram} style={{ height: "30px", width: "30px" }} />
          <img src={linkedin} style={{ height: "30px", width: "30px" }} />
        </div>
        <div className="navigate-links">
          <span>About</span>
          <span>Contact</span>
          <span>Rules</span>
        </div>
        <br />
        <div className="copyright">
          <h3>All rights reserved to Alin's Cinema 2023 ©</h3>
        </div>
      </div>
    </div>
  );
}

export default Footer;
