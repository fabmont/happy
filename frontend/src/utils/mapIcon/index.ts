import Leaflet from "leaflet";

import mapIcon from "../../assets/map-pin.svg";

export default Leaflet.icon({
  iconUrl: mapIcon,
  iconAnchor: [29, 68],
  iconSize: [58, 68],
  popupAnchor: [175, 2],
});
