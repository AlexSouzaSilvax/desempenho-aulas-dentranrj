import React from 'react';

interface PerformanceCardProps {
  data: {
    disciplina: string;
    quantidade_aulas: string;
  };
}

function PerformanceCard({ data }: PerformanceCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{data.disciplina}</h3>
      <p className="text-3xl font-bold text-gray-800">{data.quantidade_aulas}</p>
      <p className="text-gray-600 text-sm">aulas concluídas</p>
    </div>
  );
}

export default PerformanceCard;