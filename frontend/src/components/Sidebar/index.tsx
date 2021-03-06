import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import mapMarkerImg from "../../assets/map-pin.svg";
import "./styles.css";

const Sidebar: React.FC = () => {
  const { goBack } = useHistory();
  return (
    <aside id="sidebar-container">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
