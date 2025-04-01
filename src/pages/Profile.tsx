
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { ArrowLeft, User, Mail, Car, Save } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha seu nome.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Erro na atualização",
        description: "Não foi possível atualizar seu perfil. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-unidriver-100 rounded-full flex items-center justify-center">
                <User size={40} className="text-unidriver-600" />
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600 mt-1">
                  {user?.userType === "driver" ? "Motorista" : "Passageiro"}
                </p>
                <div className="flex items-center mt-2">
                  <Mail size={16} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{user?.email}</span>
                </div>
                {user?.userType === "driver" && (
                  <div className="mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm inline-flex items-center">
                    <Car size={14} className="mr-1" />
                    Motorista verificado
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="bio">Sobre você</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Conte um pouco sobre você, seus interesses, horários disponíveis, etc."
                  rows={4}
                />
              </div>

              {user?.userType === "driver" && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Informações de motorista</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Estas informações são visíveis para os passageiros que desejam pegar carona com você.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="carModel">Modelo do carro</Label>
                      <Input
                        id="carModel"
                        placeholder="Ex: Honda Civic 2020"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="licensePlate">Placa do veículo</Label>
                      <Input
                        id="licensePlate"
                        placeholder="Ex: ABC1234"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Salvando..." : (
                  <>
                    <Save size={18} className="mr-2" />
                    Salvar alterações
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
