import React from 'react';
import MapComponent from '../components/Map/MapComponent';
import SOSButton from '../components/UI/SOSButton';

const MapPage = () => {
  return (
    <div style={{ position: 'relative' }}>
      <h2 style={{ textAlign: 'center', margin: '10px 0' }}>Her Path - Live Map</h2>
      {/* Map Engine */}
      <MapComponent />
      {/* SOS Button */}
      <SOSButton />
    </div>
  );
};

export default MapPage;