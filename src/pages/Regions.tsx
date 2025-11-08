import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Navbar from "@/components/Navbar";
import { Search, ShieldCheck, Lock, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const libraries: ("places")[] = ["places"];
const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "600px",
};

const center = { lat: -15.7975, lng: -47.8919 };
const blueCarIcon = "https://cdn-icons-png.flaticon.com/512/744/744465.png";

export default function Regions() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // ✅ Autenticação
  const { isAuthenticated, user } = useAuth();
  const isDriver = user?.tipo_usuario?.toLowerCase().trim() === "motorista";

  const [cars, setCars] = useState<
    { id: string; position: { lat: number; lng: number } }[]
  >([]);
  const [destination, setDestination] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<google.maps.LatLngLiteral | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Inicializa carros
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

  // Movimento dos carros
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

  // Pesquisar local
  const handleSearch = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.geometry?.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedPlace(location);
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <p className="text-gray-600 mt-10 text-lg animate-pulse">Carregando mapa...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <Navbar />

      <div className="relative pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">

        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Para onde você quer ir?
        </motion.h1>

        {/* Barra de pesquisa */}
        <div className="relative max-w-2xl mx-auto mb-10 flex items-center gap-2">
          <div className="flex-grow bg-white shadow-md rounded-full px-4 py-3 flex items-center">
            <Search className="text-gray-500 mr-2" />
            <Autocomplete
              onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
              onPlaceChanged={handleSearch}
            >
              <input
                type="text"
                placeholder="Digite um destino..."
                className="w-full focus:outline-none text-gray-700"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Autocomplete>
          </div>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-blue-700 transition font-medium"
          >
            Buscar
          </button>
        </div>

        {/* Mapa */}
        <div className="rounded-2xl shadow-xl overflow-hidden relative z-10">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={selectedPlace || center}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              styles: [
                { featureType: "poi", stylers: [{ visibility: "off" }] },
                { featureType: "road", elementType: "geometry", stylers: [{ color: "#b3d4fc" }] },
                { featureType: "water", stylers: [{ color: "#a1c4fd" }] },
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

            {selectedPlace && (
              <Marker
                position={selectedPlace}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: new window.google.maps.Size(44, 44),
                }}
              />
            )}
          </GoogleMap>
        </div>

        {/* Cards de segurança */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-white/80 backdrop-blur-md shadow-md rounded-xl p-6 text-center border border-blue-100 hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <ShieldCheck className="mx-auto text-blue-600 mb-3" size={36} />
            <h3 className="font-semibold text-gray-800 mb-2">Segurança verificada</h3>
            <p className="text-gray-600 text-sm">
              Motoristas e passageiros passam por verificação de identidade e histórico.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-md shadow-md rounded-xl p-6 text-center border border-blue-100 hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <Lock className="mx-auto text-blue-600 mb-3" size={36} />
            <h3 className="font-semibold text-gray-800 mb-2">Proteção de dados</h3>
            <p className="text-gray-600 text-sm">Informações protegidas e criptografadas.</p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-md shadow-md rounded-xl p-6 text-center border border-blue-100 hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <Users className="mx-auto text-blue-600 mb-3" size={36} />
            <h3 className="font-semibold text-gray-800 mb-2">Comunidade confiável</h3>
            <p className="text-gray-600 text-sm">
              Usuários reais com avaliações para criar confiança mútua.
            </p>
          </motion.div>
        </div>

        {/* ✅ BOTÃO FIXO NA PARTE INFERIOR DA PÁGINA */}
        {isAuthenticated && isDriver && (
          <div className="mt-20 mb-10 text-center">
            <p className="text-gray-700 font-medium mb-4 text-lg">
              Motorista? Crie uma nova viagem agora, rápido e fácil.
            </p>

            <button
              onClick={() => (window.location.href = "/create-trip")}
              className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition font-semibold text-lg flex items-center gap-3 mx-auto"
            >
              Criar nova viagem
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
