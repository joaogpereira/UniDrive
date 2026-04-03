import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DestinationAutocomplete } from "@/components/DestinationAutocomplete";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import type { LocationSuggestion } from "@/types/location";


const center: [number, number] = [-15.7975, -47.8919];

const locationIqKey = import.meta.env.VITE_LOCATIONIQ_KEY;

const tileUrl = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${locationIqKey}`;

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

function ChangeMapView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function Regions() {
  const { isAuthenticated, user } = useAuth();
  const isDriver = user?.tipo_usuario?.toLowerCase().trim() === "motorista";
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const [originPlace, setOriginPlace] = useState<LocationSuggestion | null>(null);
  const [destinationPlace, setDestinationPlace] = useState<LocationSuggestion | null>(null);

  const selectedCoords: [number, number] | null = destinationPlace
    ? [Number(destinationPlace.lat), Number(destinationPlace.lon)]
    : originPlace
      ? [Number(originPlace.lat), Number(originPlace.lon)]
      : null;

  const handleSearch = async () => {
    setErrorMessage("");

    if (!originPlace || !destinationPlace) {
      setErrorMessage("Selecione a origem e o destino na lista.");
      return;
    }

    const payload = {
      origin: {
        lat: Number(originPlace.lat),
        lon: Number(originPlace.lon),
        address: originPlace.display_name,
      },
      destination: {
        lat: Number(destinationPlace.lat),
        lon: Number(destinationPlace.lon),
        address: destinationPlace.display_name,
      },
    };

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/api/user/driverslist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("O que estou enviando", payload);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao processar a viagem.");
      }

      navigate("/triplist", {
        state: {
          tripData: data,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

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

        <div className="relative max-w-2xl mx-auto mb-10 flex flex-col gap-3">
          <label className="text-sm text-gray-600">
            Local de saída
          </label>

          <DestinationAutocomplete
            value={origin}
            onChange={setOrigin}
            onSelect={setOriginPlace}
            placeholder="De onde você está saindo?"
          />

          <label className="text-sm text-gray-600">
            Local de chegada
          </label>

          <DestinationAutocomplete
            value={destination}
            onChange={setDestination}
            onSelect={setDestinationPlace}
            placeholder="Para onde você está indo?"
          />

          {errorMessage && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {errorMessage}
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-blue-700 transition font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>


        <div className="rounded-2xl shadow-xl overflow-hidden relative z-10">
          <MapContainer
            center={selectedCoords || center}
            zoom={13}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "600px" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors &copy; LocationIQ'
              url={tileUrl}
            />

            <ChangeMapView center={selectedCoords || center} zoom={13} />

            {selectedCoords && (
              <Marker position={selectedCoords}>
                <Popup>
                  {destinationPlace?.display_name || originPlace?.display_name}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
