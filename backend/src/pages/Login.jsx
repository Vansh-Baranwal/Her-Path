import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // Ek page se dusre page par bhejne ka tool

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Her Path - Safety App</h1>
      <p>Mudasir yahan apna sundar Login UI lagayenge.</p>
      
      {/* Is button par click karte hi user map par chala jayega */}
      <button 
        onClick={() => navigate('/map')}
        style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
      >
        Go to Map 🚀
      </button>
    </div>
  );
};

export default Login;