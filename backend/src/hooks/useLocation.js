import { useState, useEffect } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Development Hack: Hum yahan ek dummy real-world location (jaise Bihar ya aapka local area) set kar rahe hain
    // Taaki aap project ka aage ka map aur marker design kar sakein
    setTimeout(() => {
      setLocation({
        lat: 25.9225, // Yeh latitude hai
        lng: 85.3122, // Yeh longitude hai
      });
    }, 1000); // 1 second ka delay (loading jaisa feel dene ke liye)
    
  }, []);

  return { location, error };
};

export default useLocation;