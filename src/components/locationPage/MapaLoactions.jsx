import { cn } from '@/ultils/cn';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const MapaLoactions = ({ className, data = [] }) => {
  const locations = data.map((item) => ({
    position: [item.latitud, item.longitud],
    name: item.name,
  }));

  return (
    <MapContainer
      className={cn(
        'rounded-2xl shadow-xl overflow-hidden z-0',
        className
      )}
      center={[-6.476290191744883, -76.38743536910783]}
      zoom={14}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((rest, i) => (
        <Marker key={'marker' + i} position={rest.position}>
          <Popup>{rest.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

MapaLoactions.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf({
    id: PropTypes.number,
    name: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
}