
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CarFront, Clock, Calendar, MapPin, DollarSign } from "lucide-react";

interface CreateRideFormProps {
  onSuccess?: () => void;
  region?: string;
}

const CreateRideForm = ({ onSuccess, region }: CreateRideFormProps) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [spots, setSpots] = useState("3");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!from || !to || !date || !time || !price) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock API call to create a ride
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If onSuccess callback is provided, call it
      if (onSuccess) {
        onSuccess();
      } else {
        toast({
          title: "Carona criada!",
          description: "Sua carona foi criada com sucesso.",
        });
        
        // Navigate to the regions page if no callback
        navigate("/regions");
      }
    } catch (error) {
      console.error("Ride creation error:", error);
      toast({
        title: "Erro na criação",
        description: "Não foi possível criar a carona. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="from">De onde? *</Label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <MapPin size={16} />
            </div>
            <Input
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Local de partida"
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="to">Para onde? *</Label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <MapPin size={16} />
            </div>
            <Input
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Local de destino"
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date">Data *</Label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <Calendar size={16} />
            </div>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Horário *</Label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <Clock size={16} />
            </div>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Valor (R$) *</Label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <DollarSign size={16} />
            </div>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0,00"
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spots">Vagas disponíveis</Label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <CarFront size={16} />
            </div>
            <Input
              id="spots"
              type="number"
              min="1"
              max="10"
              value={spots}
              onChange={(e) => setSpots(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Adicione informações adicionais sobre a carona..."
          rows={4}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Criando..." : "Criar carona"}
      </Button>
    </form>
  );
};

export default CreateRideForm;
