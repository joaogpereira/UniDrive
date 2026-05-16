import { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateRideForm from "@/components/CreateRideForm";
import {
  Clock,
  User,
  MapPin,
  Calendar,
  ArrowLeft,
  Car,
  Plus,
  Send,
} from "lucide-react";

const regionNames: Record<string, string> = {
  "asa-norte": "Asa Norte",
  "asa-sul": "Asa Sul",
  "lago-sul": "Lago Sul",
  "lago-norte": "Lago Norte",
  taguatinga: "Taguatinga",
  guara: "Guará",
};

const RidesList = () => {
  const { region } = useParams<{ region: string }>();
  const location = useLocation();
  const tripData = location.state?.tripData;

  const rides = tripData?.trips || [];
  const loading = false;

  const [showCreateModal, setShowCreateModal] = useState(false);

  const { toast } = useToast();
  const { user, isDriver } = useAuth();

  const handleRequestRide = async (ride: any) => {
  try {
    const rawToken = localStorage.getItem("token");
    const token = rawToken?.replace(/^"|"$/g, "");

    console.log("========== DEBUG FRONT RIDE REQUEST ==========");
    console.log("Usuário do contexto:", user);
    console.log("É motorista?", isDriver);
    console.log("Ride completa:", ride);
    console.log("Trip ID enviado:", ride?.id);
    console.log("Token existe?", !!token);
    console.log("Token início:", token ? token.substring(0, 40) + "..." : null);
    console.log("URL:", "http://localhost:8000/api/ride-requests");

    if (!token) {
      toast({
        title: "Usuário não autenticado",
        description: "Token não encontrado no localStorage.",
        variant: "destructive",
      });
      return;
    }

    const response = await fetch("http://localhost:8000/api/ride-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        trip_id: ride.id,
      }),
    });

    const responseText = await response.text();

    console.log("Status ride-request:", response.status);
    console.log("Resposta bruta ride-request:", responseText);

    let data: any = {};

    try {
      data = JSON.parse(responseText);
      console.log("Resposta JSON ride-request:", data);
    } catch {
      console.log("Ride-request não retornou JSON.");
    }

    console.log("========== FIM DEBUG FRONT RIDE REQUEST ==========");

    if (!response.ok) {
      throw new Error(
        data.error ||
        data.message ||
        `Erro HTTP ${response.status}`
      );
    }

    toast({
      title: "Solicitação enviada",
      description: data.message || "O motorista irá analisar seu pedido.",
    });
  } catch (error) {
    console.error("Erro completo no handleRequestRide:", error);

    toast({
      title: "Erro ao solicitar participação",
      description:
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado.",
      variant: "destructive",
    });
  }
};

  const regionName = region ? regionNames[region] : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link
            to="/regions"
            className="flex items-center text-gray-600 hover:text-unidriver-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Voltar para regiões</span>
          </Link>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Caronas em {regionName}
            </h1>
            <p className="text-gray-600">
              Encontre motoristas oferecendo caronas na região de {regionName}.
            </p>
          </div>

          {isDriver && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-unidriver-600 hover:bg-unidriver-700"
            >
              <Plus size={18} className="mr-2" />
              Criar Carona
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unidriver-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {rides.length > 0 ? (
              rides.map((ride: any, index: number) => (
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
                          <MapPin
                            size={18}
                            className="text-unidriver-500 mr-2"
                          />
                          <div>
                            <p className="text-gray-600">
                              De{" "}
                              <span className="font-medium text-gray-900">
                                {ride.local_saida}
                              </span>
                            </p>
                            <p className="text-gray-600">
                              Para{" "}
                              <span className="font-medium text-gray-900">
                                {ride.local_destino}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar size={16} className="mr-1" />
                            <span>
                              {new Date(ride.data_partida).toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <Clock size={16} className="mr-1" />
                            <span>{ride.hora_de_partida.slice(0, 5)}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <User size={16} className="mr-1" />
                            <span>
                              {ride.vagas_disponiveis}{" "}
                              {ride.vagas_disponiveis === 1
                                ? "lugar"
                                : "lugares"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-3">
                        <div className="bg-gray-100 px-4 py-2 rounded-full">
                          <span className="font-semibold text-unidriver-700">
                            R$ {Number(ride.preco_gasolina).toFixed(2)}
                          </span>
                        </div>

                        {!isDriver && (
                          <Button
                            onClick={() => handleRequestRide(ride)}
                            className="w-full md:w-auto bg-unidriver-600 hover:bg-unidriver-700"
                          >
                            <Send size={18} className="mr-2" />
                            Solicitar participação
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-unidriver-100 rounded-full flex items-center justify-center mr-3">
                          <Car size={20} className="text-unidriver-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {ride.driver?.user?.name || "Motorista"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <Car size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Nenhuma carona encontrada
                </h3>
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

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Criar carona em {regionName}</DialogTitle>
          </DialogHeader>

          <CreateRideForm
            onSuccess={() => {
              setShowCreateModal(false);
              toast({
                title: "Carona criada com sucesso",
                description:
                  "Sua carona foi publicada na região de " + regionName,
              });
            }}
            region={region || ""}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RidesList;