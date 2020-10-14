import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "./styles.css";
import logo from "../../assets/logo.svg";

export default function LandingPage() {
  return (
    <div id="landing-container">
      <div className="content-wrapper">
        <img src={logo} alt="happy logo" draggable={false} />
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Brasília</strong>
          <span>Distrito Federal</span>
        </div>

        <Link className="forward-link" to="/orfanatos">
          <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}
