import { useState } from "react";
import LocationDrawer from "../components/SHARING/LocationDrawer";

export default function LocationPage({ navigate }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    navigate("home");
  };

  return (
    <div className="min-h-screen bg-[#080A10]">
      <LocationDrawer isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
