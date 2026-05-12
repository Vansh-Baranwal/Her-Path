import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 
import useLocation from '../../hooks/useLocation';

// 1. API functions import kiye
import { fetchUnsafeAreas, fetchNearbyPolice } from '../../services/api';
// 2. Dummy data bhi import kiya (Backup ke liye)
import { dummyPoliceStations, unsafeAreas as dummyUnsafeAreas } from '../../utils/dummyData';

const redMarkerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
};

const MapComponent = () => {
  const { location, error } = useLocation();
  const [centerPosition, setCenterPosition] = useState([23.3440, 85.3090]);

  // NAYE STATES: Real data store karne ke liye
  const [policeData, setPoliceData] = useState([]);
  const [dangerData, setDangerData] = useState([]);

  // Jab location mile toh center update karo
  useEffect(() => {
    if (location) {
      setCenterPosition([location.lat, location.lng]);
    }
  }, [location]);

  // 🚀 ASLI DATA FETCH KARNE KA LOGIC 🚀
  useEffect(() => {
    const loadMapData = async () => {
      // API se data mangwa rahe hain
      const realPolice = await fetchNearbyPolice();
      const realDanger = await fetchUnsafeAreas();

      // Agar API se data aaye toh wo set karo, warna (fallback) dummy data dikha do
      setPoliceData(realPolice.length > 0 ? realPolice : dummyPoliceStations);
      setDangerData(realDanger.length > 0 ? realDanger : dummyUnsafeAreas);
    };

    loadMapData(); // Function call
  }, []); // Khali array ka matlab hai yeh sirf page load hone par ek baar chalega

  return (
    <div>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      <MapContainer center={centerPosition} zoom={13} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ChangeView center={location ? [location.lat, location.lng] : null} />

        {/* User Location */}
        {location && (
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              <strong>Aap yahan hain!</strong>
            </Popup>
          </Marker>
        )}

        {/* Police Stations (Ab yeh state variable se aa rahe hain) */}
        {policeData.map((station) => (
          <Marker 
            key={station.id} 
            position={[station.lat, station.lng]} 
            icon={redMarkerIcon}
          >
            <Popup>
              🚓 <strong>{station.name}</strong> <br /> Safe Zone
            </Popup>
          </Marker>
        ))}

        {/* Unsafe Areas (Ab yeh bhi state variable se aa rahe hain) */}
        {dangerData.map((area) => (
          <Circle
            key={area.id}
            center={[area.lat, area.lng]}
            radius={area.radius}
            pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.3 }}
          >
            <Popup>
              ⚠️ <strong>Alert: Unsafe Zone</strong> <br /> {area.name}
            </Popup>
          </Circle>
        ))}

      </MapContainer>
    </div>
  );
};

export default MapComponent;