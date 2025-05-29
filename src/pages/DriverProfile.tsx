import { useEffect, useState } from "react";
import { ArrowLeft, User, Star, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const DriverProfile = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [driverName, setDriverName] = useState("");
  const [email, setEmail] = useState("");
  const [driverRating, setDriverRating] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [accountStatus, setAccountStatus] = useState<"Pendente" | "Aprovado" | "Rejeitado">("Pendente");

  const [cars, setCars] = useState([]);
  const [tripHistory, setTripHistory] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [verificationSteps, setVerificationSteps] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/motorista/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setDriverName(data.name);
        setEmail(data.email);
        setDriverRating(data.rating);
        setTotalTrips(data.totalTrips);
        setAccountStatus(data.accountStatus);
        setCars(data.cars);
        setTripHistory(data.tripHistory);
        setReviews(data.reviews);
        setVerificationSteps(data.verificationSteps);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (isLoading) return <div className="p-6">Carregando perfil...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-lg font-medium text-blue-600">Unidriver</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{driverName}</span>
          <Button variant="outline" size="sm">Sair</Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/lovable-uploads/f627ac4e-0765-4314-b61e-8878e4868651.png" />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{driverName}</h2>
              <p className="text-gray-600">Motorista</p>
              <p className="text-gray-500 text-sm">{email}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{driverRating}</span>
                  <span className="text-gray-500 text-sm">({totalTrips} viagens)</span>
                </div>
                <Badge
                  className={`${
                    accountStatus === "Aprovado"
                      ? "bg-green-500 text-white"
                      : accountStatus === "Pendente"
                      ? "bg-yellow-400 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {accountStatus}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="cars">Meus Carros</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="verification">Verificação</TabsTrigger>
            <TabsTrigger value="about">Sobre Mim</TabsTrigger>
          </TabsList>

          {/* TabsContent omitidos por brevidade — você pode reaproveitar os seus existentes para `cars`, `tripHistory`, etc. */}
        </Tabs>
      </div>
    </div>
  );
};

export default DriverProfile;
