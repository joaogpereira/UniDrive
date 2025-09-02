
import { useState } from "react";
import { ArrowLeft, User, Star, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
//////////////////////////////////////////////////////////
//simulação do que é necessario ter para montar o perfil//
/////////////////////////////////////////////////////////
const DriverProfile = () => {
  const [driverName, setDriverName] = useState("João Guilherme");
  const [email] = useState("Joao@gmail.com");
  
  const driverRating = 4.8;
  const totalTrips = 156;
  const accountStatus = "Pendente";

  const cars = [
    { id: 1, model: "Honda Civic", plate: "ABC-1234", year: "2020", color: "Branco" },
    { id: 2, model: "Toyota Corolla", plate: "XYZ-5678", year: "2019", color: "Prata" }
  ];

  const tripHistory = [
    { id: 1, date: "2024-01-15", origin: "Campus UFPE", destination: "Shopping RioMar", fare: "R$ 15,00" },
    { id: 2, date: "2024-01-14", origin: "Casa Forte", destination: "Campus UFPE", fare: "R$ 12,00" },
    { id: 3, date: "2024-01-13", origin: "Boa Viagem", destination: "Centro", fare: "R$ 18,00" }
  ];

  const reviews = [
    { id: 1, rating: 5, comment: "Excelente motorista, muito pontual!"},
    { id: 2, rating: 4, comment: "Viagem tranquila e segura."},
    { id: 3, rating: 5, comment: "Carro limpo e motorista educado."}
  ];

  const verificationSteps = [
    { step: "Documentos pessoais", status: "Aprovado", color: "bg-green-500" },
    { step: "Registro criminal", status: "Pendente", color: "bg-yellow-500" },
    { step: "Comprovante acadêmico", status: "Aprovado", color: "bg-green-500" },
    { step: "Verificação do veículo", status: "Pendente", color: "bg-yellow-500" }
  ];
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
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
                <Badge variant={accountStatus === "Pendente" ? "default" : "secondary"}>
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

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={email} disabled />
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cars">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Meus Carros</CardTitle>
                <Link to="/manage-cars">
                  <Button>Cadastrar novo carro</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cars.map((car) => (
                    <div key={car.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{car.model}</h3>
                          <p className="text-sm text-gray-600">Placa: {car.plate}</p>
                          <p className="text-sm text-gray-600">Ano: {car.year} | Cor: {car.color}</p>
                        </div>
                        <Button variant="outline" size="sm">Editar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Viagens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tripHistory.map((trip) => (
                    <div key={trip.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{trip.origin} → {trip.destination}</p>
                          <p className="text-sm text-gray-600">{trip.date}</p>
                        </div>
                        <span className="font-medium text-green-600">{trip.fare}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle>Processo de Verificação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationSteps.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="flex-1">{item.step}</span>
                      <Badge variant={item.status === "Aprovado" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações e Comentários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DriverProfile;