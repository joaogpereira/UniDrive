
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MessageSquare, Users } from "lucide-react";

const Payment = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock ride data - in a real app this would come from an API
  const rideData = {
    id: rideId,
    from: "UnB",
    to: "Shopping Conjunto Nacional",
    date: "2023-05-20",
    time: "14:30",
    driver: "Carlos Silva",
    price: 15,
    spots: 3,
    passengers: 2,
  };

  const handleJoinChat = async () => {
    setIsRedirecting(true);
    
    try {
      // Simulate a short delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Entrando no chat",
        description: "Você foi adicionado ao chat da carona.",
      });
      
      navigate(`/chat/${rideId}`);
    } catch (error) {
      console.error("Error joining chat:", error);
      toast({
        title: "Erro",
        description: "Não foi possível entrar no chat. Tente novamente.",
        variant: "destructive",
      });
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-600 hover:text-unidriver-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Voltar</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Detalhes da Carona
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Informações da carona</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">De:</span>
                      <span className="font-medium text-gray-900">{rideData.from}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Para:</span>
                      <span className="font-medium text-gray-900">{rideData.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data:</span>
                      <span className="font-medium text-gray-900">{rideData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horário:</span>
                      <span className="font-medium text-gray-900">{rideData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Motorista:</span>
                      <span className="font-medium text-gray-900">{rideData.driver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vagas:</span>
                      <span className="font-medium text-gray-900">{rideData.spots}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passageiros:</span>
                      <span className="font-medium text-gray-900">{rideData.passengers}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="bg-blue-50 p-6 rounded-lg mb-6 flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <MessageSquare size={20} className="text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900">Chat da Carona</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Ao entrar no chat, você poderá conversar com o motorista e outros passageiros para combinar detalhes da carona.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Users size={16} className="mr-2" />
                    <span>{rideData.passengers} passageiros já entraram neste chat</span>
                  </div>
                  <Button 
                    onClick={handleJoinChat} 
                    className="w-full"
                    disabled={isRedirecting}
                  >
                    {isRedirecting ? (
                      <>
                        <span className="mr-2">Entrando...</span>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      </>
                    ) : (
                      <>
                        <MessageSquare className="mr-2" size={18} />
                        Entrar no Chat
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
