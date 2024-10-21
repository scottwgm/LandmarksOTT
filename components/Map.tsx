'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

interface Landmark {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
}

const Map = () => {
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);

  useEffect(() => {
    const fetchLandmarks = async () => {
      const response = await fetch('/api/landmarks');
      const data = await response.json();
      setLandmarks(data);
    };

    fetchLandmarks();
  }, []);

  const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer center={[45.4215, -75.6972]} zoom={13} style={{ height: 'calc(100vh - 64px)', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {landmarks.map((landmark) => (
        <Marker
          key={landmark.id}
          position={[landmark.latitude, landmark.longitude]}
          icon={customIcon}
        >
          <Popup>
            <h3 className="font-bold">{landmark.name}</h3>
            <p>{landmark.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;