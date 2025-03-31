
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, CheckCircle, Clock } from "lucide-react";

const Payment = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiry || !cvv) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos do cartão.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsComplete(true);
      
      toast({
        title: "Pagamento confirmado!",
        description: "Seu pagamento foi processado com sucesso.",
      });
      
      // Redirect to chat after a short delay
      setTimeout(() => {
        navigate(`/chat/${rideId}`);
      }, 3000);
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar o pagamento. Verifique os dados e tente novamente.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
    const onlyNumbers = value.replace(/[^\d]/g, '');
    
    return onlyNumbers.replace(regex, (_, p1, p2, p3, p4) => {
      let result = '';
      if (p1) result += p1;
      if (p2) result += ' ' + p2;
      if (p3) result += ' ' + p3;
      if (p4) result += ' ' + p4;
      return result;
    }).trim();
  };

  const formatExpiry = (value: string) => {
    const regex = /^(\d{0,2})(\d{0,2})$/g;
    const onlyNumbers = value.replace(/[^\d]/g, '');
    
    return onlyNumbers.replace(regex, (_, p1, p2) => {
      let result = '';
      if (p1) result += p1;
      if (p2) result += '/' + p2;
      return result;
    }).trim();
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
              {isComplete ? "Pagamento Confirmado" : "Finalizar Pagamento"}
            </h1>

            {isComplete ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Pagamento processado com sucesso!
                </h2>
                <p className="text-gray-600 mb-6">
                  Você será redirecionado para o chat da carona em instantes.
                </p>
                <div className="animate-pulse flex justify-center">
                  <Clock size={24} className="text-gray-400" />
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Detalhes da carona</h3>
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
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-900">Total:</span>
                          <span className="font-semibold text-unidriver-600">R$ {rideData.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Número do cartão</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-500">
                          <CreditCard size={16} />
                        </div>
                        <Input
                          id="cardNumber"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="0000 0000 0000 0000"
                          className="pl-10"
                          maxLength={19}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Nome no cartão</Label>
                      <Input
                        id="cardName"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Como aparece no cartão"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Validade</Label>
                        <Input
                          id="expiry"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/AA"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={cvv}
                          onChange={(e) => {
                            const onlyNumbers = e.target.value.replace(/[^\d]/g, '');
                            setCvv(onlyNumbers);
                          }}
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <span className="mr-2">Processando...</span>
                          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        </>
                      ) : (
                        `Pagar R$ ${rideData.price.toFixed(2)}`
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
