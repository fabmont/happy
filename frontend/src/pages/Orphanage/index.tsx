import React, { useState, useEffect } from 'react';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import './orphanage.css';
import Sidebar from '../../components/Sidebar';
import happyMapIcon from '../../utils/mapIcon';
import api from '../../services/api';
import OrphanageTypes from '../../interfaces/orphanages';

interface RouteParams {
  id: string;
}

export default function Orphanage() {
  const { id } = useParams<RouteParams>();
  const [orphanage, setOrphanage] = useState<OrphanageTypes>();
  const [highlightImg, setHighlightImg] = useState(0);

  useEffect(() => {
    const fetchOrphanages = async () => {
      try {
        const { data } = await api.get(`/orphanages/${id}`);

        setOrphanage(data);
      } catch (error) {
        setOrphanage(undefined);
      }
    };

    fetchOrphanages();
  }, [id]);

  if (!orphanage) {
    return <div>Carregando...</div>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[highlightImg].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  className="active"
                  type="button"
                  onClick={() => setHighlightImg(index)}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.latitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.latitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>
              <div
                className={
                  orphanage.open_on_weekends
                    ? 'open-on-weekends'
                    : 'closed-on-weekends'
                }
              >
                <FiInfo
                  size={32}
                  color={orphanage.open_on_weekends ? '#39CC83' : '#FF669D'}
                />
                {orphanage.open_on_weekends ? 'Atendemos' : 'Não atendemos'} em
                <br />
                fins de semana
              </div>
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
