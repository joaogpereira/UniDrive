
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clock, User, MapPin, Calendar, ArrowLeft, Car, Star, MessageCircle } from "lucide-react";

// Mock data for rides
const mockRides = {
  "asa-norte": [
    { id: 1, from: "UnB", to: "Shopping Conjunto Nacional", date: "2023-05-20", time: "14:30", driver: "Carlos Silva", rating: 4.8, price: 15, spots: 3 },
    { id: 2, from: "Praça do Relógio", to: "Parque da Cidade", date: "2023-05-20", time: "16:45", driver: "Maria Oliveira", rating: 4.5, price: 12, spots: 2 },
    { id: 3, from: "Biblioteca Nacional", to: "Setor Comercial Norte", date: "2023-05-21", time: "08:15", driver: "João Pereira", rating: 4.9, price: 18, spots: 1 },
  ],
  "asa-sul": [
    { id: 4, from: "Shopping Pátio Brasil", to: "Aeroporto", date: "2023-05-20", time: "10:00", driver: "Ana Luiza", rating: 4.7, price: 25, spots: 2 },
    { id: 5, from: "Setor Bancário Sul", to: "Setor Hoteleiro Sul", date: "2023-05-20", time: "12:30", driver: "Rafael Costa", rating: 4.6, price: 10, spots: 4 },
    { id: 6, from: "CCBB", to: "Esplanada dos Ministérios", date: "2023-05-21", time: "09:00", driver: "Juliana Mendes", rating: 4.8, price: 15, spots: 3 },
    { id: 7, from: "Parque da Cidade", to: "CLS 205/206", date: "2023-05-22", time: "17:30", driver: "Marcos Paulo", rating: 4.4, price: 13, spots: 2 },
  ],
  "lago-sul": [
    { id: 8, from: "Pontão do Lago Sul", to: "Aeroporto", date: "2023-05-20", time: "11:15", driver: "Fernanda Lima", rating: 4.9, price: 30, spots: 3 },
    { id: 9, from: "Jardim Botânico", to: "Centro Comercial Gilberto Salomão", date: "2023-05-21", time: "15:00", driver: "Lucas Mendonça", rating: 4.7, price: 22, spots: 1 },
  ],
  "lago-norte": [
    { id: 10, from: "Deck Norte", to: "Asa Norte", date: "2023-05-20", time: "13:30", driver: "Beatriz Campos", rating: 4.5, price: 20, spots: 2 },
    { id: 11, from: "Península dos Ministros", to: "Centro", date: "2023-05-22", time: "09:45", driver: "Gustavo Almeida", rating: 4.6, price: 25, spots: 4 },
  ],
  "taguatinga": [
    { id: 12, from: "Taguatinga Shopping", to: "Rodoviária do Plano Piloto", date: "2023-05-20", time: "07:00", driver: "Ricardo Souza", rating: 4.8, price: 15, spots: 3 },
    { id: 13, from: "Taguacenter", to: "Setor Comercial Sul", date: "2023-05-21", time: "08:30", driver: "Patrícia Vieira", rating: 4.4, price: 18, spots: 2 },
    { id: 14, from: "Águas Claras", to: "UnB", date: "2023-05-22", time: "06:45", driver: "Eduardo Martins", rating: 4.7, price: 20, spots: 1 },
  ],
  "guara": [
    { id: 15, from: "Guará I", to: "Setor Bancário Sul", date: "2023-05-20", time: "07:30", driver: "Roberta Dias", rating: 4.6, price: 15, spots: 2 },
    { id: 16, from: "Guará II", to: "Esplanada dos Ministérios", date: "2023-05-21", time: "06:30", driver: "Daniel Oliveira", rating: 4.7, price: 18, spots: 3 },
  ],
};

// Region name mapping
const regionNames: Record<string, string> = {
  "asa-norte": "Asa Norte",
  "asa-sul": "Asa Sul",
  "lago-sul": "Lago Sul",
  "lago-norte": "Lago Norte",
  "taguatinga": "Taguatinga",
  "guara": "Guará",
};

const RidesList = () => {
  const { region } = useParams<{ region: string }>();
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (region && mockRides[region as keyof typeof mockRides]) {
        setRides(mockRides[region as keyof typeof mockRides]);
      } else {
        setRides([]);
      }
      setLoading(false);
    }, 800);
  }, [region]);
  
  const handleStartChat = (rideId: number) => {
    toast({
      title: "Abrindo chat",
      description: "Você será direcionado para o chat com o motorista e outros passageiros.",
    });
    navigate(`/chat/${rideId}`);
  };
  
  const regionName = region ? regionNames[region] : "";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/regions" className="flex items-center text-gray-600 hover:text-unidriver-600 transition-colors">
            <ArrowLeft size={20} className="mr-1" />
            <span>Voltar para regiões</span>
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Caronas em {regionName}
          </h1>
          <p className="text-gray-600">
            Encontre motoristas oferecendo caronas na região de {regionName}.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unidriver-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {rides.length > 0 ? (
              rides.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <MapPin size={18} className="text-unidriver-500 mr-2" />
                          <div>
                            <p className="text-gray-600">De <span className="font-medium text-gray-900">{ride.from}</span></p>
                            <p className="text-gray-600">Para <span className="font-medium text-gray-900">{ride.to}</span></p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar size={16} className="mr-1" />
                            <span>{ride.date}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock size={16} className="mr-1" />
                            <span>{ride.time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <User size={16} className="mr-1" />
                            <span>{ride.spots} {ride.spots === 1 ? "lugar" : "lugares"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start md:items-end">
                        <div className="bg-gray-100 px-4 py-2 rounded-full mb-3">
                          <span className="font-semibold text-unidriver-700">R$ {ride.price.toFixed(2)}</span>
                        </div>
                        <Button 
                          onClick={() => handleStartChat(ride.id)}
                          className="w-full md:w-auto"
                        >
                          <MessageCircle size={18} className="mr-2" />
                          Conversar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-unidriver-100 rounded-full flex items-center justify-center mr-3">
                          <Car size={20} className="text-unidriver-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{ride.driver}</p>
                          <div className="flex items-center">
                            <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
                            <span className="text-sm text-gray-600">{ride.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <Car size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma carona encontrada</h3>
                <p className="text-gray-600 mb-6">
                  No momento não há caronas disponíveis nesta região.
                </p>
                <Button asChild variant="outline">
                  <Link to="/regions">Ver outras regiões</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RidesList;
