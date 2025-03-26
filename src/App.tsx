import axios from "axios";
import { AlertCircle, Heart, Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ClassesTable from "./components/ClassesTable";
import DonationModal from "./components/DonationModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PerformanceCard from "./components/PerformanceCard";
import { Pix } from "./interfaces/Pix.interface";

function App() {
  
  const API_URL = import.meta.env.VITE_API_URL;
  
  const URL_QR_CODE_PIX = import.meta.env.VITE_URL_QR_CODE_PIX;
  const URL_PIX_KEY = import.meta.env.VITE_URL_PIX_KEY;

  const URL_FOTO_TITULAR = import.meta.env.VITE_URL_FOTO_TITULAR;
  const NOME_TITULAR = import.meta.env.VITE_NOME_TITULAR;
  const DOCUMENTO_TITULAR = import.meta.env.VITE_DOCUMENTO_TITULAR;

  const [renach, setRenach] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [data, setData] = useState({
    theoreticalClasses: [],
    practicalClasses: [],
    completion: [],
    classesCount: [],
  });

  const getDados = async () => {
    if (!renach || renach.length !== 9) {
      toast.error("Por favor, insira um RENACH válido com 9 dígitos");
      return;
    }

    setLoading(true);

    try {
      const [theoretical, practical, completion, count] = await Promise.all([
        axios.post(`${API_URL}/api/aulas/teorica/detalhe`, { renach: renach }),
        axios.post(`${API_URL}/api/aulas/pratica/detalhe`, { renach: renach }),
        axios.post(`${API_URL}/api/aulas/conclusao`, { renach: renach }),
        axios.post(`${API_URL}/api/aulas/teorica/resumo`, { renach: renach }),
      ]);

      setData({
        theoreticalClasses: theoretical.data,
        practicalClasses: practical.data,
        completion: completion.data,
        classesCount: count.data,
      });
    } catch (error) {
      toast.error("Erro ao buscar dados. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [pix, setPix] = useState<Pix>({
    urlQrCodePix: URL_QR_CODE_PIX,
    pixKey: "",
    nomeTitular: NOME_TITULAR,
    documentoTitular: DOCUMENTO_TITULAR,
    urlFotoTitular: URL_FOTO_TITULAR,
  });

  useEffect(() => {
    const getPix = async () => {
      try {
        const respPixKey = await axios.get(URL_PIX_KEY);
        console.log();
        if (respPixKey.status != 200) {
          throw new Error("Erro ao buscar Pix Copia e Cola");
        }
        setPix({ ...pix, pixKey: await respPixKey.data });
      } catch (error) {
        console.error("Erro ao buscar Pix Copia e Cola: ", error);
      }
    };

    getPix();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-gray-600 mr-2" />
            <p className="text-gray-600 text-sm">
              Não armazenamos nenhum dado. Todas as informações são obtidas
              diretamente do DETRAN-RJ.
            </p>
          </div>

          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={renach}
              onChange={(e) => setRenach(e.target.value.replace(/\D/g, ""))}
              placeholder="Digite o RENACH (somente números)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
              maxLength={9}
            />
            <button
              onClick={getDados}
              disabled={loading}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                "Buscando..."
              ) : (
                <>
                  <Search size={20} />
                  Buscar
                </>
              )}
            </button>
          </div>

          {data.classesCount.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.classesCount.map((item, index) => (
                <PerformanceCard key={index} data={item} />
              ))}
            </div>
          )}

          {data.theoreticalClasses.length > 0 && (
            <ClassesTable
              title="Aulas Teóricas"
              data={data.theoreticalClasses}
            />
          )}

          {data.practicalClasses.length > 0 && (
            <ClassesTable title="Aulas Práticas" data={data.practicalClasses} />
          )}
        </div>

        <button
          onClick={() => setShowDonation(true)}
          className="fixed bottom-24 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-500"
        >
          <Heart className="h-6 w-6" />
        </button>
      </main>

      <Footer />

      {showDonation && (
        <DonationModal onClose={() => setShowDonation(false)} pix={pix} />
      )}
    </div>
  );
}

export default App;
