import { Copy, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Pix } from "../interfaces/Pix.interface";

interface DonationModalProps {
  onClose: () => void;
  pix: Pix | undefined;
}

function DonationModal({ onClose, pix }: DonationModalProps) {
  const [loadingFotoTitular, setLoadingFotoTitular] = useState(true);
  const [loadingPixQrCode, setLoadingPixQrCode] = useState(true);

  const handleLoadingFotoTitular = () => {
    setLoadingFotoTitular(false);
  };

  const handleLoadingPixQrCode = () => {
    setLoadingPixQrCode(false);
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pix!.pixKey);
    toast.success("Chave PIX copiada!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Apoie este Projeto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-center text-sm">Gostou do projeto? Faça uma contribuição via Pix 💠</p>

        <div className="text-center mb-6 mt-3">
          {loadingFotoTitular && (
            <div className="flex justify-center mb-4">
              <div className=" flex items-center justify-center w-32 h-32 rounded-full border-2 border-green-500 rounded bg-gray-120">
                <div className="animate-spin w-8 h-8 border-t-4 border-green-500 border-solid rounded-full"></div>
              </div>
            </div>
          )}
          <img
            src={pix!.urlFotoTitular}
            alt="Desenvolvedor"
            className="w-32 h-32 rounded-full mx-auto mb-4 drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
            onLoad={handleLoadingFotoTitular}
            style={{ display: loadingFotoTitular ? "none" : "block" }}
          />
          <h3 className="font-semibold text-lg">{pix!.nomeTitular}</h3>
          <p className="text-center">{pix!.documentoTitular}</p>
          <p className="text-gray-600">Desenvolvedor</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              viewBox="0 0 1000 322.6"
              className="w-20 h-19"
            >
              <path
                fill="#21c25e"
                d="M205.6 260.5h46.8V124.2h-46.8zm62.9-229H237V63h31.5zM91.9 46.8H46.8v39.5h41.9c26.6 0 41.9 12.9 41.9 37.1s-15.3 37.9-41.9 37.9H46.8V87.1H0v173.4h46.8v-59.7h44.4c54 0 85.5-29 85.5-79-.1-46.8-30.7-75-84.8-75M300 0h-94.4v94.4H300zm-15.3 78.2h-62.9V15.3h62.9zm274.2-31.4h-42.7v39.5h40.3c26.6 0 41.9 12.9 41.9 37.1s-15.3 37.9-41.9 37.9h-40.3V87.1h-46.8v173.4h46.8v-59.7h42.7c54 0 85.5-29 85.5-79 0-46.8-31.5-75-85.5-75m392.7 50-40.3 101.6L871 96.8h-48.4l64.5 163.7-25 62.1h49.2L1000 96.8zM741.9 96c-28.2 0-50 6.5-74.2 18.5l14.5 32.3c16.9-9.7 33.9-14.5 49.2-14.5 22.6 0 33.9 9.7 33.9 27.4v3.2h-45.2c-40.3 0-62.1 18.5-62.1 49.2 0 29.8 21 50.8 56.5 50.8 22.6 0 38.7-8.1 51.6-21.8v17.7h46V152.4c-1.6-34.7-26.6-56.4-70.2-56.4m27.5 109.6c-4.8 13.7-18.5 25-37.9 25-16.1 0-25.8-8.1-25.8-21s8.9-18.5 26.6-18.5h37.1zM371.8 225c-22.6 0-38.7-17.7-38.7-44.4 0-25.8 16.1-43.5 38.7-43.5 16.1 0 28.2 6.5 37.1 17.7l31.5-22.6c-14.5-21.8-39.5-34.7-71-34.7-49.2-.8-83.1 33.1-83.1 83.1s33.9 83.1 83.1 83.1c33.9 0 58.9-13.7 72.6-36.3l-32.3-21.8c-8.1 12.9-21 19.4-37.9 19.4"
              ></path>
            </svg>
          </div>

          {loadingPixQrCode && (
            <div className="flex justify-center">
              <div className="flex justify-center items-center justify-center w-48 h-48 border-2 border-green-500 rounded bg-gray-120 mt-1">
                <div className="animate-spin w-8 h-8 border-t-4 border-green-500 border-solid rounded-full"></div>
              </div>
            </div>
          )}
          <img
            src={pix!.urlQrCodePix}
            alt="QR Code PIX"
            className="w-48 h-48 mx-auto mt-1 border-2 border-green-500 rounded"
            onLoad={handleLoadingPixQrCode}
            style={{ display: loadingPixQrCode ? "none" : "block" }}
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg mb-5">
          <input
            type="text"
            value={pix!.pixKey}
            readOnly
            className="flex-1 bg-transparent border-none focus:outline-none"
          />
          <button
            onClick={copyPixKey}
            className="text-gray-600 hover:text-gray-800"
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonationModal;
