import { useState } from "react";
import { ArrowLeft, MapPin, Clock, Car, Fuel, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar"; // Importando a Navbar
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const CreateTrip = () => {
  const [tripData, setTripData] = useState({
    carId: "",
    originAddress: "",
    destinationAddress: "",
    departureDate: "",
    departureTime: "",
    fuelPrice: "",
    carConsumption: "",
    maxPassengers: "",
    pricePerPassenger: "",
    description: "",
    fuelType: "",  // Novo estado para o tipo de combustível
  });

  // Dados fictícios dos carros do motorista
  const userCars = [
    { id: "1", brand: "Toyota", model: "Corolla", year: "2020", plate: "ABC-1234" },
    { id: "2", brand: "Honda", model: "Civic", year: "2021", plate: "XYZ-5678" }
  ];

  // Lista de tipos de combustível
  const fuelTypes = [
    "Gasolina Comum",
    "Podium",
    "Etanol",
    "Diesel",
    "GNV"
  ];

  const handleInputChange = (field: string, value: string) => {
    setTripData(prev => ({ ...prev, [field]: value }));
  };

  const calculateEstimatedCost = () => {
    const { fuelPrice, carConsumption } = tripData;
    if (fuelPrice && carConsumption) {
      // Estimativa básica para 100km
      const estimatedDistance = 100;
      const fuelNeeded = estimatedDistance / parseFloat(carConsumption);
      const totalCost = fuelNeeded * parseFloat(fuelPrice);
      return totalCost.toFixed(2);
    }
    return "0.00";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Viagem criada!",
      description: "Sua viagem foi publicada e está disponível para passageiros.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar com a classe fixed */}
      <Navbar />

      <div className="max-w-2xl mx-auto p-6 pt-20"> {/* Adicionei `pt-20` para garantir que o conteúdo não seja sobreposto */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção do Veículo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Selecionar Veículo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="car">Escolha seu veículo *</Label>
                <Select onValueChange={(value) => handleInputChange("carId", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o carro para a viagem" />
                  </SelectTrigger>
                  <SelectContent>
                    {userCars.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.brand} {car.model} {car.year} - {car.plate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Informações da Rota */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Informações da Rota
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="origin">Local de Saída *</Label>
                <Input
                  id="origin"
                  value={tripData.originAddress}
                  onChange={(e) => handleInputChange("originAddress", e.target.value)}
                  placeholder="Ex: Rua das Flores, 123 - Centro, São Paulo"
                  required
                />
              </div>

              <div>
                <Label htmlFor="destination">Local de Destino *</Label>
                <Input
                  id="destination"
                  value={tripData.destinationAddress}
                  onChange={(e) => handleInputChange("destinationAddress", e.target.value)}
                  placeholder="Ex: Av. Paulista, 1000 - Bela Vista, São Paulo"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Data e Hora */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Data e Hora da Partida
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data de Partida *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={tripData.departureDate}
                    onChange={(e) => handleInputChange("departureDate", e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Hora de Partida *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={tripData.departureTime}
                    onChange={(e) => handleInputChange("departureTime", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custos e Consumo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5" />
                Informações de Combustível
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fuelPrice">Preço da Gasolina (R$/L) *</Label>
                  <Input
                    id="fuelPrice"
                    type="number"
                    step="0.01"
                    value={tripData.fuelPrice}
                    onChange={(e) => handleInputChange("fuelPrice", e.target.value)}
                    placeholder="5.50"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="consumption">Consumo do Carro (km/L) *</Label>
                  <Input
                    id="consumption"
                    type="number"
                    step="0.1"
                    value={tripData.carConsumption}
                    onChange={(e) => handleInputChange("carConsumption", e.target.value)}
                    placeholder="12.5"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fuelType">Tipo de Gasolina *</Label>
                <Select onValueChange={(value) => handleInputChange("fuelType", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o tipo de gasolina" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((fuelType, index) => (
                      <SelectItem key={index} value={fuelType}>
                        {fuelType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {tripData.fuelPrice && tripData.carConsumption && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Calculator className="h-4 w-4" />
                    <span className="font-medium">Estimativa de custo (100km):</span>
                  </div>
                  <p className="text-blue-600 text-lg font-semibold mt-1">
                    R$ {calculateEstimatedCost()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configurações da Viagem */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Viagem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="maxPassengers">Máximo de Passageiros *</Label>
                  <Select onValueChange={(value) => handleInputChange("maxPassengers", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Vagas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 passageiro</SelectItem>
                      <SelectItem value="2">2 passageiros</SelectItem>
                      <SelectItem value="3">3 passageiros</SelectItem>
                      <SelectItem value="4">4 passageiros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              <div>
                <Label htmlFor="description">Observações (Opcional)</Label>
                <Textarea
                  id="description"
                  value={tripData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Ex: Saída pontual, ar-condicionado ligado, aceito paradas rápidas..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg">
            Criar Viagem
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;
