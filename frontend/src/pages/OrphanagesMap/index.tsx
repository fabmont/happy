import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMoon, FiPlus, FiSun } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "./styles.css";
import logo from "../../assets/logo.svg";
import mapIcon from "../../utils/mapIcon";
import api from "../../services/api";

interface Images {
  id: number;
  url: string;
}

interface Orphanage {
  id: number;
  about: string;
  images: Images[];
  instructions: string;
  latitude: number;
  longitude: number;
  name: string;
  open_on_weekends: boolean;
  opening_hours: string;
}

export default function OrphanagesMap() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    const fetchOrphanages = async () => {
      try {
        const { data } = await api.get("/orphanages");

        setOrphanages(data);
      } catch (error) {
        setOrphanages([]);
      }
    };

    fetchOrphanages();
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={logo} alt="happy logo" draggable={false} />

          <h2>Escolha um orfanato no mapa</h2>
          <p>
            Muitas crianças estão esperando a sua visita{" "}
            <span role="img" aria-label="inlove">
              🥰
            </span>
          </p>
        </header>

        <footer>
          <strong>Brasília</strong>
          <span>Distrito Federal</span>
          <button
            className="theme-switcher-btn"
            onClick={() => setDarkTheme((prev) => !prev)}
          >
            {darkTheme ? <FiSun /> : <FiMoon />} &nbsp; Ativar mapa{" "}
            {darkTheme ? "claro" : "escuro"}
          </button>
        </footer>
      </aside>

      <Map
        center={[-15.7948153, -47.894307]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${
            darkTheme ? "dark" : "light"
          }-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${
            process.env.REACT_APP_MAPBOX_TOKEN
          }`}
        />
        {orphanages.map((item) => (
          <Marker position={[item.latitude, item.longitude]} icon={mapIcon}>
            <Popup
              className="map-popup"
              closeButton={false}
              minWidth={248}
              maxWidth={248}
            >
              {item.name}
              <Link to={`/orfanatos/${item.id}`} className="view-orphanage-btn">
                <FiArrowRight />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/criar-orfanato" className="create-orphanages">
        <FiPlus />
      </Link>
    </div>
  );
}
