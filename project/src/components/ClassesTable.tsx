import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface ClassesTableProps {
  title: string;
  data: Array<{
    data: string;
    inicio: string;
    fim: string;
    disciplina: string;
    status: string;
  }>;
}

function ClassesTable({ title, data }: ClassesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'data' | 'disciplina' | 'status'>('data');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 10;

  const sortedData = [...data].sort((a, b) => {
    if (sortField === 'data') {
      const dateA = new Date(a.data.split('/').reverse().join('-'));
      const dateB = new Date(b.data.split('/').reverse().join('-'));
      return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    return sortDirection === 'asc'
      ? a[sortField].localeCompare(b[sortField])
      : b[sortField].localeCompare(a[sortField]);
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: 'data' | 'disciplina' | 'status') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }: { field: 'data' | 'disciplina' | 'status' }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('data')}
              >
                <div className="flex items-center gap-1">
                  Data
                  <SortIcon field="data" />
                </div>
              </th>
              <th className="px-4 py-2 text-left">Início</th>
              <th className="px-4 py-2 text-left">Fim</th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('disciplina')}
              >
                <div className="flex items-center gap-1">
                  Disciplina
                  <SortIcon field="disciplina" />
                </div>
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-1">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.data}</td>
                <td className="px-4 py-2">{item.inicio}</td>
                <td className="px-4 py-2">{item.fim}</td>
                <td className="px-4 py-2">{item.disciplina}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'Computada' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 px-4">
            <div className="text-sm text-gray-600">
              Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, data.length)} de {data.length} registros
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? 'bg-gray-800 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassesTable;