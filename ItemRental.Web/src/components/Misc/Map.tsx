import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

interface Position {
  lat: number;
  lon: number;
}

const MapWithSearch: React.FC = () => {
  const [position, setPosition] = useState<Position | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const place = (e.target as HTMLFormElement).elements.place.value;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${place}&format=json`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setPosition({ lat: parseFloat(lat), lon: parseFloat(lon) });
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const LocationMarker: React.FC = () => {
    const map = useMapEvents({
      click: (e: any) => {
        setPosition({ lat: e.latlng.lat, lon: e.latlng.lng });
      },
    });

    return position === null ? null : (
      <Marker position={[position.lat, position.lon]}>
        <Popup>
          Latitude: {position.lat}, Longitude: {position.lon}
        </Popup>
      </Marker>
    );
  };

  return (
    <MapContainer center={{ lat: 48.71291, lng: 44.52693 }} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapWithSearch;
