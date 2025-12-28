import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { 
  ShieldCheckIcon, 
  CheckCircleIcon, 
  AlertTriangleIcon, 
  ClockIcon, 
  XIcon,
  FileTextIcon,
  CalendarIcon
} from '../components/Icons';

// Type definitions
interface Inspection {
  id: string;
  location: string;
  date: string;
  status: string;
  result: string;
  items: number;
  issues: number;
}

interface HistoryItem {
  date: string;
  result: 'Aprovado' | 'Irregular' | 'Em Análise';
  issues: number;
  inspector: string;
}

const InspectionDetailsModal: React.FC<{
  inspection: Inspection;
  onClose: () => void;
}> = ({ inspection, onClose }) => {
  
  // Mock history data relative to the selected location
  const history: HistoryItem[] = [
    { date: '20/07/2023', result: 'Aprovado', issues: 0, inspector: 'Carlos Silva' },
    { date: '15/04/2023', result: 'Irregular', issues: 3, inspector: 'Ana Souza' },
    { date: '10/01/2023', result: 'Aprovado', issues: 0, inspector: 'Carlos Silva' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-fade-in overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-500/10 rounded-lg text-brand-500">
              <ShieldCheckIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{inspection.location}</h2>
              <p className="text-xs text-zinc-500 font-mono">{inspection.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Current Inspection Status */}
          <section>
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Inspeção Atual</h3>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Data da Visita</p>
                <div className="flex items-center gap-2 text-white font-medium">
                  <CalendarIcon className="w-4 h-4 text-brand-500" />
                  {inspection.date}
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Status</p>
                <span className="text-white font-medium">{inspection.status}</span>
              </div>
              <div>
                 <p className="text-xs text-zinc-500 mb-1">Resultado</p>
                 <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium border ${
                   inspection.issues > 0 
                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                    : inspection.result === 'Pendente'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-brand-500/10 text-brand-500 border-brand-500/20'
                 }`}>
                   {inspection.issues > 0 ? 'Irregular' : inspection.result}
                 </div>
              </div>
            </div>
          </section>

          {/* History Timeline */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Histórico de Resultados</h3>
              <button className="text-xs text-brand-500 hover:text-brand-400 font-medium">Exportar Histórico</button>
            </div>
            
            <div className="relative border-l border-zinc-800 ml-3 space-y-8 py-2">
              {history.map((item, index) => (
                <div key={index} className="relative pl-8 group">
                  {/* Timeline Dot */}
                  <div className={`
                    absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-zinc-900 transition-colors
                    ${item.result === 'Aprovado' ? 'bg-brand-500' : 'bg-yellow-500'}
                  `} />
                  
                  <div className="bg-zinc-900 border border-zinc-800/50 rounded-xl p-4 hover:border-zinc-700 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{item.date}</span>
                        <span className="text-zinc-600 text-xs">•</span>
                        <span className="text-xs text-zinc-400">Inspetor: {item.inspector}</span>
                      </div>
                      <div className={`
                        text-xs font-medium px-2 py-1 rounded-md border w-fit
                        ${item.result === 'Aprovado' 
                          ? 'text-brand-400 bg-brand-500/5 border-brand-500/10' 
                          : 'text-yellow-500 bg-yellow-500/5 border-yellow-500/10'}
                      `}>
                        {item.result}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <AlertTriangleIcon className={`w-3.5 h-3.5 ${item.issues > 0 ? 'text-yellow-500' : 'text-zinc-600'}`} />
                        {item.issues} não conformidades
                      </span>
                      <button className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                        <FileTextIcon className="w-3.5 h-3.5" />
                        Ver laudo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Fechar</Button>
          <Button>Baixar Relatório Completo</Button>
        </div>
      </div>
    </div>
  );
};

const Inspections: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);

  // Mock data
  const inspections: Inspection[] = [
    { 
      id: 'INS-2024-001', 
      location: 'Setor de Montagem', 
      date: '24/10/2023', 
      status: 'Concluído', 
      result: 'Regular',
      items: 12, 
      issues: 0 
    },
    { 
      id: 'INS-2024-002', 
      location: 'Almoxarifado B', 
      date: '25/10/2023', 
      status: 'Concluído', 
      result: 'Irregular',
      items: 24, 
      issues: 2 
    },
    { 
      id: 'INS-2024-003', 
      location: 'Refeitório', 
      date: '26/10/2023', 
      status: 'Em Análise', 
      result: 'Pendente',
      items: 8, 
      issues: 0 
    },
  ];

  const filteredInspections = inspections.filter(i => 
    i.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Inspeções e Auditorias</h1>
          <p className="text-zinc-400 mt-1">Histórico de visitas técnicas e resultados de análise.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="w-full sm:w-64">
            <Input 
              label="" 
              placeholder="Buscar por Local..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-900"
            />
          </div>
          <Button>Solicitar Nova</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredInspections.length === 0 ? (
           <div className="text-center py-12 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
             <p className="text-zinc-500">Nenhuma inspeção encontrada.</p>
           </div>
        ) : (
          filteredInspections.map((inspection) => (
            <div key={inspection.id} className="group bg-zinc-900 border border-zinc-800/60 rounded-xl p-5 shadow-sm hover:border-brand-500/50 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* ID and Location */}
                <div className="flex items-start gap-4 min-w-[30%]">
                  <div className={`p-3 rounded-xl bg-zinc-950 border border-zinc-800 shrink-0 group-hover:bg-brand-500/10 group-hover:border-brand-500/20 transition-colors`}>
                    <ShieldCheckIcon className="w-6 h-6 text-zinc-400 group-hover:text-brand-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{inspection.location}</h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">{inspection.id}</span>
                  </div>
                </div>

                {/* Visit Date */}
                <div className="flex flex-col md:items-center md:px-4 md:border-l md:border-zinc-800/50 min-w-[20%]">
                   <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">Última Visita</p>
                   <div className="flex items-center gap-2 text-zinc-200">
                      <ClockIcon className="w-4 h-4 text-brand-500" />
                      <span className="font-medium">{inspection.date}</span>
                   </div>
                </div>

                {/* Analysis Result */}
                <div className="flex flex-col md:items-end justify-between md:border-l md:border-zinc-800/50 md:pl-4 min-w-[25%]">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2 self-start md:self-end">Resultado da Análise</p>
                  
                  {inspection.issues > 0 ? (
                    <div className="flex items-center gap-2 text-yellow-500 text-sm font-semibold bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20 w-full md:w-auto justify-center">
                      <AlertTriangleIcon className="w-4 h-4" />
                      {inspection.issues} PENDÊNCIAS
                    </div>
                  ) : inspection.result === 'Pendente' ? (
                     <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 w-full md:w-auto justify-center">
                      <ClockIcon className="w-4 h-4" />
                      EM ANÁLISE
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-brand-500 text-sm font-semibold bg-brand-500/10 px-3 py-1.5 rounded-lg border border-brand-500/20 w-full md:w-auto justify-center">
                      <CheckCircleIcon className="w-4 h-4" />
                      APROVADO
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setSelectedInspection(inspection)}
                    className="text-xs font-medium text-zinc-500 hover:text-white transition-colors mt-2 text-right w-full flex items-center justify-end gap-1"
                  >
                    Ver detalhes <span className="text-xs">→</span>
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedInspection && (
        <InspectionDetailsModal 
          inspection={selectedInspection} 
          onClose={() => setSelectedInspection(null)} 
        />
      )}
    </div>
  );
};

export default Inspections;