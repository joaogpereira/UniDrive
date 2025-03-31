
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, Car } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Encontre caronas facilmente com <span className="text-unidriver-600">Unidriver</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conectamos motoristas e passageiros para viagens mais econômicas, sustentáveis e seguras.
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {isAuthenticated ? (
              <Button asChild size="lg" className="px-8 py-6 text-lg">
                <Link to="/regions">
                  <span>Encontrar Caronas</span>
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="px-8 py-6 text-lg">
                  <Link to="/register">
                    <span>Cadastre-se Grátis</span>
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
                  <Link to="/login">Entrar</Link>
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="rounded-full bg-unidriver-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Car className="text-unidriver-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Caronas Seguras</h3>
            <p className="text-gray-600">Todos os motoristas são verificados para garantir sua segurança.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="rounded-full bg-unidriver-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-unidriver-600" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Economize</h3>
            <p className="text-gray-600">Caronas são mais econômicas do que táxis e outros serviços de transporte.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="rounded-full bg-unidriver-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-unidriver-600" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L8 7H16L12 2z"/><path d="M12 22L8 17H16L12 22z"/><path d="M5 17H3V7H5"></path><path d="M21 7H19V17H21"></path><path d="M12 17V7"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Meio Ambiente</h3>
            <p className="text-gray-600">Contribua para reduzir a emissão de CO2 compartilhando viagens.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
