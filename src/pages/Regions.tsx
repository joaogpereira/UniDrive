
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { MapPin } from "lucide-react";

// Sample data for regions
const regions = [
  {
    id: "asa-norte",
    name: "Asa Norte",
    rides: 12,
    image: "https://images.unsplash.com/photo-1560261172-5d8eee7616fa?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "asa-sul",
    name: "Asa Sul",
    rides: 15,
    image: "https://images.unsplash.com/photo-1585310942677-9841c52cb8a8?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "lago-sul",
    name: "Lago Sul",
    rides: 8,
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c72b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "lago-norte",
    name: "Lago Norte",
    rides: 6,
    image: "https://images.unsplash.com/photo-1513689125086-6c432170e843?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "taguatinga",
    name: "Taguatinga",
    rides: 10,
    image: "https://images.unsplash.com/photo-1563290134-38f4e6a5fde3?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "guara",
    name: "Guará",
    rides: 9,
    image: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&q=80&w=1000"
  }
];

const Regions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Selecione uma região
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Escolha a região para encontrar caronas disponíveis. Nosso sistema mostra motoristas que oferecem caronas em cada área.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link 
                to={`/regions/${region.id}`}
                className="block group h-full"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transform transition-transform group-hover:scale-[1.02]">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${region.image})` }}
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-unidriver-600 transition-colors">
                        {region.name}
                      </h3>
                      <div className="flex items-center text-gray-500">
                        <MapPin size={16} className="mr-1 text-unidriver-500" />
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {region.rides} {region.rides === 1 ? "carona disponível" : "caronas disponíveis"}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                      <span className="inline-flex items-center text-sm font-medium text-unidriver-600 group-hover:text-unidriver-700 transition-colors">
                        Ver caronas disponíveis
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Regions;
