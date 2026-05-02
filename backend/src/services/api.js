// Yeh file Backend (Vansh/Debayan) se real data fetch karne ka kaam karegi

// Abhi ke liye hum aapke local computer ka server address daal rahe hain
// Jab backend deploy hoga, toh yeh URL change ho jayega (e.g., Render ka URL)
const BASE_URL = 'http://localhost:8000'; 

// 1. Unsafe Areas lane ka API function
export const fetchUnsafeAreas = async () => {
  try {
    const response = await fetch(`${BASE_URL}/unsafe-areas`);
    if (!response.ok) throw new Error("Data fetch fail ho gaya");
    return await response.json();
  } catch (error) {
    console.error("Unsafe Areas Error:", error);
    return []; // Error aane par khali array return karega taaki app crash na ho
  }
};

// 2. Nearby Police Stations lane ka API function
export const fetchNearbyPolice = async () => {
  try {
    const response = await fetch(`${BASE_URL}/police-nearby`);
    if (!response.ok) throw new Error("Police data fetch fail ho gaya");
    return await response.json();
  } catch (error) {
    console.error("Police Data Error:", error);
    return []; 
  }
};