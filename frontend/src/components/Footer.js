import React from "react";
import logo from "../img/logo.png";
import {Link} from "react-router-dom";


function Footer(props) {
  return <footer className="footer-wrapper">
    <div className="footer-container">
        <div className="footer-up">
            <div className="logo">
              <Link to={`/`} className="logo">
                  <img src={logo} alt="Logo"/>
              </Link>
              <div className="text">The New Creative<br/>Economy</div>
            </div>
            <div className="stacks">
                <h5>Stacks</h5>
                <p>Discover</p>
                <p>Connect wallet</p>
                <p>Create item</p>
            </div>
            <div className="info">
                <h5>Info</h5>
                <p>Download</p>
                <p>Demos</p>
                <p>Support</p>
            </div>
            <div className="newsletter">
                <h5>Join Newsletter</h5>
                <p>Subscribe our newsletter to get more free design<br/>course and resource</p>
                <form>
                    <input type="text" placeholder="Enter your email"/>
                    <button type="submit"></button>
                </form>
            </div>
        </div>
        <div className="footer-down">

        </div>
    </div>
  </footer>;
}

export default Footer;