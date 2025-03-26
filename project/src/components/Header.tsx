import { Car } from 'lucide-react';

function Header() {
  return (
    <header className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car size={32} />
            <div>
              <h1 className="text-2xl font-bold">Desempenho Aulas Auto Escola</h1>
              <p className="text-gray-400 text-sm">Consulta o desempenho das Aulas de Auto Escola no DETRAN-RJ</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;