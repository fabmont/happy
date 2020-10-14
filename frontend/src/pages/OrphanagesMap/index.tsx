import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map, TileLayer } from "react-leaflet";

import "./styles.css";
import logo from "../../assets/logo.svg";

export default function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={logo} alt="happy logo" draggable={false} />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita 🥰</p>
        </header>

        <footer>
          <strong>Brasília</strong>
          <span>Distrito Federal</span>
        </footer>
      </aside>

      <Map
        center={[-15.7948153, -47.894307]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
      </Map>

      <Link to="/" className="create-orphanages">
        <FiPlus />
      </Link>
    </div>
  );
}
