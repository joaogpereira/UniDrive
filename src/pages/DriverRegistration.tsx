import { useState, useEffect } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const DriverRegistration = () => {
  const [formData, setFormData] = useState({
    nome_completo: "",
    email: "",
    telefone: "",
    cpf: "",
    data_nascimento: "",
    endereco: "",
    faculdade: "",
    curso: "",
    matricula: "",
    cnh: "",
    categoria_cnh: "",
    nome_contato_emergencia: "",
    telefone_contato_emergencia: ""
  });

  const [documents, setDocuments] = useState({
    foto_rg: null,
    registro_criminal: null,
    comprovante_academico: null,
    foto_cnh: null,
    foto_perfil: null
  });

  // Carregar dados do localStorage quando o componente for montado
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    
    if (userData) {
      setFormData({
        nome_completo: userData.name || "",
        email: userData.email || "",
        telefone: "", // Se houver no localStorage, adicione esses dados
        cpf: "", 
        data_nascimento: "", // Se houver no localStorage
        endereco: "", 
        faculdade: "", 
        curso: "", 
        matricula: "", 
        cnh: "", 
        categoria_cnh: "", 
        nome_contato_emergencia: "", 
        telefone_contato_emergencia: ""
      });
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setDocuments(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Verifique se o campo endereco não está vazio antes de enviar
  if (!formData.endereco) {
    console.log("Campo endereco está vazio!");
    toast({
      title: "Erro",
      description: "O campo de endereço é obrigatório.",
    });
    return; // Impede o envio do formulário
  }

    // Logs das etapas da requisição
    console.log("Iniciando o envio dos dados...");
    console.log("Dados do formulário:", formData);
    console.log("Documentos:", documents);

    // Preparar os dados para enviar para o backend
    const formDataToSend = {
      ...formData,
      documents: {
        foto_rg: documents.foto_rg,
        registro_criminal: documents.registro_criminal,
        comprovante_academico: documents.comprovante_academico,
        foto_cnh: documents.foto_cnh,
        foto_perfil: documents.foto_perfil
      }
    };

    console.log("Dados a serem enviados para o backend:", formDataToSend);

    // Enviar dados para o backend
    fetch("http://localhost:8000/driver/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataToSend),
    })
      .then((response) => {
        console.log("Resposta do servidor:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Dados recebidos do servidor:", data);
        if (data.success) {
            // Atualiza o tipo de usuário e os dados do motorista no localStorage
            const user = JSON.parse(localStorage.getItem('user')) || {};
            user.tipo_usuario = 'motorista'; // Atualiza o tipo de usuário
            user.driver_data = data.data; // Adiciona os dados do motorista ao localStorage

            // Salva a nova estrutura no localStorage
            localStorage.setItem('user', JSON.stringify(user));

            // Exibe o toast de sucesso
            toast({
                title: "Cadastro enviado!",
                description: "Seus documentos estão sendo analisados. Você receberá uma resposta em até 48h.",
            });
        } else {
          toast({
            title: "Erro",
            description: data.message || "Ocorreu um erro. Tente novamente.",
          });
        }
      })
      .catch((error) => {
        console.error("Erro de rede:", error);
        toast({
          title: "Erro de rede",
          description: "Não foi possível se conectar ao servidor. Verifique sua conexão.",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-blue-600">Unidriver - Cadastro de Motorista</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome_completo">Nome completo *</Label>
                  <Input
                    id="nome_completo"
                    value={formData.nome_completo}
                    onChange={(e) => handleInputChange("nome_completo", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="(XX) XXXXX-XXXX"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange("cpf", e.target.value)}
                    placeholder="XXX.XXX.XXX-XX"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="data_nascimento">Data de nascimento *</Label>
                  <Input
                    id="data_nascimento"
                    type="date"
                    value={formData.data_nascimento}
                    onChange={(e) => handleInputChange("data_nascimento", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endereco">Endereço completo *</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => handleInputChange("endereco", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Acadêmicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Acadêmicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="faculdade">Universidade/Faculdade *</Label>
                <Select onValueChange={(value) => handleInputChange("faculdade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua instituição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ufpe">UFPE - Universidade Federal de Pernambuco</SelectItem>
                    <SelectItem value="ufrpe">UFRPE - Universidade Federal Rural de PE</SelectItem>
                    <SelectItem value="upe">UPE - Universidade de Pernambuco</SelectItem>
                    <SelectItem value="uninassau">UNINASSAU</SelectItem>
                    <SelectItem value="facipe">FACIPE</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="curso">Curso *</Label>
                  <Input
                    id="curso"
                    value={formData.curso}
                    onChange={(e) => handleInputChange("curso", e.target.value)}
                    placeholder="Ex: Engenharia Civil"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="matricula">Matrícula *</Label>
                  <Input
                    id="matricula"
                    value={formData.matricula}
                    onChange={(e) => handleInputChange("matricula", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Habilitação */}
          <Card>
            <CardHeader>
              <CardTitle>Habilitação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cnh">Número da CNH *</Label>
                  <Input
                    id="cnh"
                    value={formData.cnh}
                    onChange={(e) => handleInputChange("cnh", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="categoria_cnh">Categoria *</Label>
                  <Select onValueChange={(value) => handleInputChange("categoria_cnh", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="AB">AB</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contato de Emergência */}
          <Card>
            <CardHeader>
              <CardTitle>Contato de Emergência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome_contato_emergencia">Nome do contato *</Label>
                  <Input
                    id="nome_contato_emergencia"
                    value={formData.nome_contato_emergencia}
                    onChange={(e) => handleInputChange("nome_contato_emergencia", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telefone_contato_emergencia">Telefone *</Label>
                  <Input
                    id="telefone_contato_emergencia"
                    value={formData.telefone_contato_emergencia}
                    onChange={(e) => handleInputChange("telefone_contato_emergencia", e.target.value)}
                    placeholder="(XX) XXXXX-XXXX"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload de Documentos */}
          <Card>
            <CardHeader>
              <CardTitle>Documentos Obrigatórios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Campos para upload de documentos */}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg">
            Enviar Cadastro para Análise
          </Button>
        </form>
      </div>
    </div>
  );
};


export default DriverRegistration;
