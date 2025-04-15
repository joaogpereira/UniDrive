
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Send, User, Car, MapPin } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isDriver: boolean;
}

// Mock ride data based on ID
const getRideById = (id: number) => {
  const allRides = [
    { id: 1, from: "UnB", to: "Shopping Conjunto Nacional", date: "2023-05-20", time: "14:30", driver: "Carlos Silva", driverId: "driver-1", rating: 4.8, price: 15, spots: 3 },
    { id: 2, from: "Praça do Relógio", to: "Parque da Cidade", date: "2023-05-20", time: "16:45", driver: "Maria Oliveira", driverId: "driver-2", rating: 4.5, price: 12, spots: 2 },
    // Add more rides as needed
  ];
  
  return allRides.find(ride => ride.id === id);
};

const RideChat = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [ride, setRide] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Fetch ride data
    if (rideId) {
      const fetchedRide = getRideById(Number(rideId));
      setRide(fetchedRide);
      
      // Mock initial messages
      const initialMessages: Message[] = [
        {
          id: 1,
          sender: fetchedRide?.driver || "Motorista",
          senderId: fetchedRide?.driverId || "driver-id",
          content: "Olá! Estou oferecendo carona. Alguém interessado?",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          isDriver: true
        },
        {
          id: 2,
          sender: "Ana Paula",
          senderId: "user-456",
          content: "Oi! Estou interessada. Qual é o horário exato da saída?",
          timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
          isDriver: false
        },
        {
          id: 3,
          sender: fetchedRide?.driver || "Motorista",
          senderId: fetchedRide?.driverId || "driver-id",
          content: `Saio às ${fetchedRide?.time || "14:30"} em ponto. Ainda tenho ${fetchedRide?.spots || 2} lugares disponíveis.`,
          timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
          isDriver: true
        }
      ];
      
      setMessages(initialMessages);
    }
  }, [rideId]);
  
  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now(),
      sender: user?.name || "Você",
      senderId: user?.id || "user-id",
      content: newMessage,
      timestamp: new Date(),
      isDriver: user?.userType === "driver"
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="pt-20 pb-10 h-screen flex flex-col">
        <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center mb-4">
            <Link to={`/regions/${ride?.region || ""}`} className="flex items-center text-gray-600 hover:text-unidriver-600 transition-colors">
              <ArrowLeft size={20} className="mr-1" />
              <span>Voltar</span>
            </Link>
          </div>
          
          {ride && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-unidriver-100 rounded-full flex items-center justify-center mr-3">
                    <Car size={20} className="text-unidriver-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{ride.driver}</h3>
                    <p className="text-sm text-gray-600">{ride.date} às {ride.time}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-1 text-unidriver-500" />
                  <span>{ride.from} → {ride.to}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-md mb-4">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user?.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-lg ${
                      message.senderId === user?.id
                        ? "bg-unidriver-600 text-white"
                        : message.isDriver
                        ? "bg-yellow-100 text-gray-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      <span className="font-medium text-sm">
                        {message.senderId === user?.id ? "Você" : message.sender}
                      </span>
                      <span className="text-xs ml-2 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <form onSubmit={handleSendMessage} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send size={18} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RideChat;
