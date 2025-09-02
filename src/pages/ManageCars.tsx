
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
    marca: "",
    modelo: "",
    ano: "",
    cor: "",
    placa: "",
    renavam: "",
    chassi: "",
    combustivel: "",
    portas: "",
    assentos: ""
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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    // Adicionar dados textuais
    Object.entries(carData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Adicionar arquivos (se tiver)
    Object.entries(documents).forEach(([key, file]) => {
      if (file) {
        let backendFieldName = '';
        switch (key) {
          case 'crlvPhoto':
            backendFieldName = 'crlv';
            break;
          case 'insurancePhoto':
            backendFieldName = 'seguro_veiculo';
            break;
          case 'carFrontPhoto':
            backendFieldName = 'foto_frontal';
            break;
          case 'carBackPhoto':
            backendFieldName = 'foto_traseira';
            break;
          case 'carInteriorPhoto':
            backendFieldName = 'foto_interior';
            break;
          default:
            backendFieldName = key;
        }
        formData.append(backendFieldName, file);
      }
    });
    const token = localStorage.getItem('token'); 
    const response = await fetch('http://localhost:8000/cars', {
      method: 'POST',
      headers: {
    // IMPORTANTE: Não setar 'Content-Type' aqui para FormData,
    // mas pode setar o Authorization:
    'Authorization': `Bearer ${token}`
  },
      body: formData,
      credentials: 'include' // caso use cookies para autenticação
    });

    // Verifica se a resposta tem o content-type JSON antes de tentar ler
    const contentType = response.headers.get('content-type');
    let responseData = null;
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      console.error('Resposta inesperada do servidor:', text);
      throw new Error('Resposta do servidor não é um JSON válido.');
    }

    if (!response.ok) {
      throw new Error(responseData?.message || 'Erro ao cadastrar veículo');
    }

    toast({
      title: "Carro cadastrado!",
      description: "Seu veículo foi adicionado e está sendo analisado pela equipe.",
    });

    // Limpar formulário ou redirecionar se quiser
    setCarData({
      marca: "",
      modelo: "",
      ano: "",
      cor: "",
      placa: "",
      renavam: "",
      chassi: "",
      combustivel: "",
      portas: "",
      assentos: ""
    });
    setDocuments({
      crlvPhoto: null,
      insurancePhoto: null,
      carFrontPhoto: null,
      carBackPhoto: null,
      carInteriorPhoto: null
    });

  } catch (error: any) {
    toast({
      variant: 'destructive',
      title: 'Erro',
      description: error.message || 'Algo deu errado.'
    });
  }
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
                  <Label htmlFor="marca">Marca *</Label>
                  <Select onValueChange={(value) => handleInputChange("marca", value)}>
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
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input
                    id="modelo"
                    value={carData.modelo}
                    onChange={(e) => handleInputChange("modelo", e.target.value)}
                    placeholder="Ex: Corolla, Civic, Focus"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ano">Ano *</Label>
                  <Input
                    id="ano"
                    value={carData.ano}
                    onChange={(e) => handleInputChange("ano", e.target.value)}
                    placeholder="Ex: 2020"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cor">Cor *</Label>
                  <Select onValueChange={(value) => handleInputChange("cor", value)}>
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
                  <Label htmlFor="placa">Placa *</Label>
                  <Input
                    id="placa"
                    value={carData.placa}
                    onChange={(e) => handleInputChange("placa", e.target.value)}
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
                  <Label htmlFor="combustivel">Combustível *</Label>
                  <Select onValueChange={(value) => handleInputChange("combustivel", value)}>
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
                  <Label htmlFor="portas">Portas *</Label>
                  <Select onValueChange={(value) => handleInputChange("portas", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qtd" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 portas</SelectItem>
                      <SelectItem value="4">4 portas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assentos">Assentos *</Label>
                  <Select onValueChange={(value) => handleInputChange("assentos", value)}>
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