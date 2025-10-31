import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Navbar from "@/components/Navbar";
import { Search } from "lucide-react";

const libraries: ("places")[] = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "1rem",
  overflow: "hidden",
  position: "relative",
  zIndex: 2,
};

const center = { lat: -15.7975, lng: -47.8919 }; // Brasília

// Ícone azul simples (carro visto de cima)
const blueCarIcon =
  "https://cdn-icons-png.flaticon.com/512/744/744465.png";

export default function Regions() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [cars, setCars] = useState<any[]>([]);
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Inicializa carros em posições aleatórias próximas ao centro
  useEffect(() => {
    const initialCars = Array.from({ length: 12 }).map(() => ({
      id: Math.random().toString(36),
      position: {
        lat: center.lat + (Math.random() - 0.5) * 0.04,
        lng: center.lng + (Math.random() - 0.5) * 0.04,
      },
    }));
    setCars(initialCars);
  }, []);

  // Move carros levemente (efeito de tráfego)
  useEffect(() => {
    const interval = setInterval(() => {
      setCars((prev) =>
        prev.map((car) => ({
          ...car,
          position: {
            lat: car.position.lat + (Math.random() - 0.5) * 0.0009,
            lng: car.position.lng + (Math.random() - 0.5) * 0.0009,
          },
        }))
      );
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <p className="text-gray-600 mt-10 text-lg animate-pulse">
          Carregando mapa...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <Navbar />

      {/* 🔵 Onda azul animada de fundo */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{
          backgroundImage:
            "url('https://svgshare.com/i/13H8.svg')", // SVG ondular sutil
          backgroundRepeat: "repeat-x",
          backgroundSize: "200% 100%",
          opacity: 0.25,
          filter: "blur(2px)",
        }}
      />

      <div className="relative pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Para onde você quer ir?
        </motion.h1>

        {/* Barra de pesquisa tipo Uber */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="flex items-center bg-white shadow-md rounded-full px-4 py-3">
            <Search className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Digite um destino..."
              className="w-full focus:outline-none text-gray-700"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {suggestions.length > 0 && (
            <div className="absolute bg-white shadow-lg mt-2 rounded-md w-full z-10">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDestination(s);
                    setSuggestions([]);
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🗺️ Mapa interativo com carros azuis */}
        <div className="rounded-2xl shadow-xl overflow-hidden relative z-10">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              styles: [
                {
                  featureType: "poi",
                  stylers: [{ visibility: "off" }],
                },
                {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [{ color: "#b3d4fc" }],
                },
                {
                  featureType: "water",
                  stylers: [{ color: "#a1c4fd" }],
                },
              ],
            }}
          >
            {cars.map((car) => (
              <Marker
                key={car.id}
                position={car.position}
                icon={{
                  url: blueCarIcon,
                  scaledSize: new window.google.maps.Size(42, 42),
                }}
              />
            ))}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
