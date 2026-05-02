import React from 'react';
import useLocation from '../../hooks/useLocation';

const SOSButton = () => {
  // Hum apna location engine yahan bhi use kar rahe hain
  const { location } = useLocation();

  const handleSOSClick = () => {
    // Agar location nahi mili hai toh alert do
    if (!location) {
      alert("⚠️ Location nahi mil rahi hai! Kripya GPS on karein.");
      return;
    }

    // Yahan hum Vansh aur Debayan (Backend) ke API ko data bhejenge.
    // Abhi API ready nahi hai, toh hum sirf test kar rahe hain.
    alert(
      `🚨 EMERGENCY SOS SENT! 🚨\n\nAapki Live Location backend par bhej di gayi hai.\nLatitude: ${location.lat}\nLongitude: ${location.lng}\n\nPolice is on the way!`
    );
    console.log("POST /sos - Data Sent:", location);
  };

  return (
    <button 
      onClick={handleSOSClick}
      style={{
        position: 'absolute',
        bottom: '30px',
        right: '30px',
        zIndex: 1000, // Yeh zIndex zaroori hai taaki button map ke upar dikhe
        backgroundColor: '#ff0000',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        fontSize: '22px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
        animation: 'pulse 1.5s infinite' // Ek chhota sa animation effect
      }}
    >
      SOS
    </button>
  );
};

export default SOSButton;