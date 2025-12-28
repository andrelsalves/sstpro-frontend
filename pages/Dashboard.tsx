import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ShieldCheckIcon, 
  CalendarIcon,
  CheckCircleIcon,
  FileTextIcon
} from '../components/Icons';

const data = [
  { name: 'Seg', agendamentos: 2, inspecoes: 4 },
  { name: 'Ter', agendamentos: 1, inspecoes: 6 },
  { name: 'Qua', agendamentos: 3, inspecoes: 5 },
  { name: 'Qui', agendamentos: 2, inspecoes: 8 },
  { name: 'Sex', agendamentos: 4, inspecoes: 7 },
  { name: 'Sáb', agendamentos: 1, inspecoes: 2 },
  { name: 'Dom', agendamentos: 0, inspecoes: 1 },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
}> = ({ title, value, trend, trendPositive, icon: Icon, colorClass }) => (
  <div className="bg-zinc-900 border border-zinc-800/60 p-6 rounded-xl shadow-sm hover:border-zinc-700 transition-colors group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-2 tracking-tight">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10 ring-1 ring-inset ring-white/5`}>
        <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm font-medium">
        <span className={`${trendPositive ? 'text-brand-500' : 'text-red-500'} flex items-center gap-0.5`}>
          {trendPositive ? '↑' : '↓'} {trend}
        </span>
        <span className="ml-2 text-zinc-500">vs. mês anterior</span>
      </div>
    )}
  </div>
);

const ActivityItem: React.FC<{
  title: string;
  desc: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'neutral';
  last?: boolean;
}> = ({ title, desc, time, type, last }) => (
  <div className="relative pl-6 pb-6 last:pb-0">
    {!last && (
      <div className="absolute top-2 left-[5px] h-full w-px bg-zinc-800" />
    )}
    <div className={`
      absolute top-2 left-0 w-2.5 h-2.5 rounded-full ring-4 ring-zinc-900
      ${type === 'success' ? 'bg-brand-500' : 
        type === 'warning' ? 'bg-yellow-500' :
        type === 'info' ? 'bg-blue-500' : 'bg-zinc-500'}
    `} />
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
      <div>
        <p className="text-sm font-medium text-zinc-200">{title}</p>
        <p className="text-xs text-zinc-500">{desc}</p>
      </div>
      <span className="text-xs font-mono text-zinc-600">{time}</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Visão Geral</h1>
          <p className="text-zinc-400 mt-1">Bem-vindo ao painel de controle SST.</p>
        </div>
        <div className="text-sm text-zinc-500 font-medium bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Dias Sem Acidentes"
          value="142"
          trend="12%"
          trendPositive={true}
          icon={ShieldCheckIcon}
          colorClass="bg-brand-500 text-brand-500"
        />
        <StatCard
          title="Próximas Vistorias"
          value="8"
          trend="2 hoje"
          trendPositive={true}
          icon={CalendarIcon}
          colorClass="bg-blue-500 text-blue-500"
        />
        <StatCard
          title="Inspeções Realizadas"
          value="45"
          trend="5%"
          trendPositive={true}
          icon={CheckCircleIcon}
          colorClass="bg-purple-500 text-purple-500"
        />
        <StatCard
          title="Relatórios Pendentes"
          value="2"
          trend="-1"
          trendPositive={true}
          icon={FileTextIcon}
          colorClass="bg-yellow-500 text-yellow-500"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800/60 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white">Produtividade</h3>
              <p className="text-sm text-zinc-500">Comparativo semanal de inspeções</p>
            </div>
            <select className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-500 hover:border-zinc-700 transition-colors">
              <option>Últimos 7 dias</option>
              <option>Este mês</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#52525b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#e4e4e7', fontSize: '12px' }}
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                />
                <Bar dataKey="inspecoes" name="Inspeções" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
                <Bar dataKey="agendamentos" name="Agendamentos" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Activity */}
        <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Linha do Tempo</h3>
          <div className="flex-1 overflow-y-auto pr-2">
            <ActivityItem 
              title="Vistoria Agendada" 
              desc="Galpão Principal - 14:00" 
              time="10m atrás" 
              type="info" 
            />
            <ActivityItem 
              title="Inspeção Finalizada" 
              desc="Setor de Produção B" 
              time="2h atrás" 
              type="success" 
            />
            <ActivityItem 
              title="Relatório Emitido" 
              desc="Conformidade NR-12" 
              time="4h atrás" 
              type="neutral" 
            />
            <ActivityItem 
              title="Checklist Iniciado" 
              desc="Empilhadeira 04" 
              time="5h atrás" 
              type="warning" 
              last={true}
            />
          </div>
          <button className="w-full mt-6 py-2.5 text-xs font-medium text-zinc-400 hover:text-brand-500 hover:bg-brand-500/5 rounded-lg transition-all border border-dashed border-zinc-800 hover:border-brand-500/30">
            Carregar mais atividades
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;