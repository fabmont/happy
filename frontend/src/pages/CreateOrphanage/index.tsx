import React, { ChangeEvent, SyntheticEvent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import './create-orphanage.css';
import Sidebar from '../../components/Sidebar';
import happyMapIcon from '../../utils/mapIcon';
import api from '../../services/api';

export default function CreateOrphanage() {
  const history = useHistory();
  const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      latitude: 0,
      longitude: 0,
      about: '',
      instructions: '',
      opening_hours: '',
      open_on_weekends: true,
      images: [],
      preview_images: [],
    },
    onSubmit: async (values, bag) => {
      try {
        const payload = new FormData();

        payload.append('name', values.name);
        payload.append('latitude', String(values.latitude));
        payload.append('longitude', String(values.longitude));
        payload.append('about', values.about);
        payload.append('instructions', values.instructions);
        payload.append('opening_hours', values.opening_hours);
        payload.append('open_on_weekends', String(values.open_on_weekends));

        values.images.forEach((img) => {
          payload.append('images', img);
        });

        await api.post('/orphanages', payload);
        history.push('/orfanatos');
      } catch (error) {
        alert('Ocorreu um erro ao cadastrar o orfanato =(');
      }
    },
  });

  const handleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setFieldValue('latitude', lat);
    setFieldValue('longitude', lng);
  };

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setFieldValue('images', selectedImages);
    setFieldValue(
      'preview_images',
      selectedImages.map((img) => URL.createObjectURL(img)),
    );
  };

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-15.7948153, -47.894307]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {values.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[Number(values.latitude), Number(values.longitude)]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" name="name" onChange={handleChange} />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                name="about"
                onChange={handleChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {values.preview_images.map((preview) => (
                  <img key={preview} src={preview} alt={values.name} />
                ))}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                type="file"
                id="image[]"
                accept=".png,.jpg,.jpeg"
                multiple
                onChange={handleImageSelect}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                name="instructions"
                onChange={handleChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                name="opening_hours"
                onChange={handleChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={values.open_on_weekends ? 'active' : ''}
                  onClick={() => setFieldValue('open_on_weekends', true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!values.open_on_weekends ? 'active' : ''}
                  onClick={() => setFieldValue('open_on_weekends', false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
