import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Navbar from "@/components/Navbar";
import { Search, ShieldCheck, Lock, Users } from "lucide-react";

const libraries: ("places")[] = ["places"];
const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "500px",
};

const center = { lat: -15.7975, lng: -47.8919 }; // Brasília
const blueCarIcon = "https://cdn-icons-png.flaticon.com/512/744/744465.png";

export default function Regions() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [cars, setCars] = useState<
    { id: string; position: { lat: number; lng: number } }[]
  >([]);
  const [destination, setDestination] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<google.maps.LatLngLiteral | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Inicializa carros próximos ao centro
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

  // Movimento suave dos carros
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

  // Função para buscar o local selecionado
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
        <p className="text-gray-600 mt-10 text-lg animate-pulse">
          Carregando mapa...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <Navbar />

      {/* Linhas azuis sutis */}
      <motion.svg
        className="absolute inset-0 z-0 opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        animate={{ x: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
      >
        <path
          d="M0,200 Q480,300 960,200 T1920,200"
          stroke="#8cc8ff"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0,500 Q480,600 960,500 T1920,500"
          stroke="#b3dcff"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0,800 Q480,900 960,800 T1920,800"
          stroke="#a0d2ff"
          strokeWidth="2"
          fill="none"
        />
      </motion.svg>

      {/* Fundo diagonal */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,178,250,0.25)_25%,transparent_25%,transparent_50%,rgba(10,178,250,0.25)_50%,rgba(10,178,250,0.25)_75%,transparent_75%,transparent)] bg-[length:80px_80px] z-0 opacity-10"
        animate={{ backgroundPositionX: ["0px", "80px"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />

      <div className="relative pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Para onde você quer ir?
        </motion.h1>

        {/* Barra de pesquisa + botão */}
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

        {/* 🗺️ Mapa */}
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
                {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [{ color: "#b3d4fc" }],
                },
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

        {/* Seção de segurança */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-white/80 backdrop-blur-md shadow-md rounded-xl p-6 text-center border border-blue-100 hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <ShieldCheck className="mx-auto text-blue-600 mb-3" size={36} />
            <h3 className="font-semibold text-gray-800 mb-2">
              Segurança verificada
            </h3>
            <p className="text-gray-600 text-sm">
              Todos os motoristas e passageiros passam por verificação de identidade
              e histórico antes de usar o Unidrive.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-md shadow-md rounded-xl p-6 text-center border border-blue-100 hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <Lock className="mx-auto text-blue-600 mb-3" size={36} />
            <h3 className="font-semibold text-gray-800 mb-2">
              Proteção de dados
            </h3>
            <p className="text-gray-600 text-sm">
              Suas informações pessoais são protegidas com criptografia de ponta e
              seguem os padrões da LGPD.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-md shadow-md rounded-xl p-6 text-center border border-blue-100 hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <Users className="mx-auto text-blue-600 mb-3" size={36} />
            <h3 className="font-semibold text-gray-800 mb-2">
              Comunidade confiável
            </h3>
            <p className="text-gray-600 text-sm">
              O Unidrive conecta pessoas reais — você pode avaliar e ser avaliado
              após cada carona, criando confiança mútua.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
