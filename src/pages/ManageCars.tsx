
import { useState } from "react";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const ManageCars = () => {
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    plate: "",
    renavam: "",
    chassi: "",
    fuel: "",
    doors: "",
    seats: ""
  });

  const [documents, setDocuments] = useState({
    crlvPhoto: null,
    insurancePhoto: null,
    carFrontPhoto: null,
    carBackPhoto: null,
    carInteriorPhoto: null
  });

  const handleInputChange = (field: string, value: string) => {
    setCarData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setDocuments(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Carro cadastrado!",
      description: "Seu veículo foi adicionado e está sendo analisado pela equipe.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <Link to="/driver-profile">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-blue-600">Cadastrar Novo Veículo</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Veículo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Informações do Veículo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Marca *</Label>
                  <Select onValueChange={(value) => handleInputChange("brand", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="ford">Ford</SelectItem>
                      <SelectItem value="chevrolet">Chevrolet</SelectItem>
                      <SelectItem value="volkswagen">Volkswagen</SelectItem>
                      <SelectItem value="hyundai">Hyundai</SelectItem>
                      <SelectItem value="nissan">Nissan</SelectItem>
                      <SelectItem value="renault">Renault</SelectItem>
                      <SelectItem value="peugeot">Peugeot</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="model">Modelo *</Label>
                  <Input
                    id="model"
                    value={carData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    placeholder="Ex: Corolla, Civic, Focus"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Ano *</Label>
                  <Input
                    id="year"
                    value={carData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    placeholder="Ex: 2020"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="color">Cor *</Label>
                  <Select onValueChange={(value) => handleInputChange("color", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Cor do veículo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branco">Branco</SelectItem>
                      <SelectItem value="preto">Preto</SelectItem>
                      <SelectItem value="prata">Prata</SelectItem>
                      <SelectItem value="cinza">Cinza</SelectItem>
                      <SelectItem value="vermelho">Vermelho</SelectItem>
                      <SelectItem value="azul">Azul</SelectItem>
                      <SelectItem value="verde">Verde</SelectItem>
                      <SelectItem value="amarelo">Amarelo</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plate">Placa *</Label>
                  <Input
                    id="plate"
                    value={carData.plate}
                    onChange={(e) => handleInputChange("plate", e.target.value)}
                    placeholder="ABC-1234"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="renavam">RENAVAM *</Label>
                  <Input
                    id="renavam"
                    value={carData.renavam}
                    onChange={(e) => handleInputChange("renavam", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="chassi">Chassi *</Label>
                <Input
                  id="chassi"
                  value={carData.chassi}
                  onChange={(e) => handleInputChange("chassi", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fuel">Combustível *</Label>
                  <Select onValueChange={(value) => handleInputChange("fuel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flex">Flex</SelectItem>
                      <SelectItem value="gasolina">Gasolina</SelectItem>
                      <SelectItem value="etanol">Etanol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="gnv">GNV</SelectItem>
                      <SelectItem value="eletrico">Elétrico</SelectItem>
                      <SelectItem value="hibrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="doors">Portas *</Label>
                  <Select onValueChange={(value) => handleInputChange("doors", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qtd" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 portas</SelectItem>
                      <SelectItem value="4">4 portas</SelectItem>
                      <SelectItem value="5">5 portas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="seats">Assentos *</Label>
                  <Select onValueChange={(value) => handleInputChange("seats", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qtd" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 lugares</SelectItem>
                      <SelectItem value="4">4 lugares</SelectItem>
                      <SelectItem value="5">5 lugares</SelectItem>
                      <SelectItem value="7">7 lugares</SelectItem>
                      <SelectItem value="8">8 lugares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentos do Veículo */}
          <Card>
            <CardHeader>
              <CardTitle>Documentos do Veículo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>CRLV (Documento do veículo) *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Foto clara do CRLV</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload("crlvPhoto", e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div>
                <Label>Seguro do veículo *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Apólice ou comprovante do seguro</p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload("insurancePhoto", e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fotos do Veículo */}
          <Card>
            <CardHeader>
              <CardTitle>Fotos do Veículo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Foto frontal *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Frente do veículo</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("carFrontPhoto", e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Foto traseira *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Traseira do veículo</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("carBackPhoto", e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Foto do interior *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Interior do veículo (banco e painel)</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload("carInteriorPhoto", e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg">
            Cadastrar Veículo
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ManageCars;