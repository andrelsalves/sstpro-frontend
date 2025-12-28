import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LogoIcon, 
  DashboardIcon, 
  ShieldCheckIcon, 
  LogOutIcon,
  MenuIcon,
  XIcon,
  FileTextIcon,
  CalendarIcon
} from './Icons';
import { User } from '../types';
import { useNotification } from '../context/NotificationContext';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const NavItem: React.FC<{ 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}> = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
      ${active 
        ? 'bg-brand-500/10 text-brand-400 shadow-sm ring-1 ring-brand-500/20' 
        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
      }
    `}
  >
    <Icon className={`w-5 h-5 transition-colors ${active ? 'text-brand-500' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
    <span>{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useNotification();

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isAdmin = user?.role === 'admin';

  // Simulate a random "Upcoming Schedule" notification on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      notify({
        type: 'info',
        title: 'Lembrete de Agendamento',
        message: 'Você tem uma vistoria técnica agendada para hoje às 14:00.'
      });
    }, 3000); // Trigger 3 seconds after load

    return () => clearTimeout(timer);
  }, [notify]);

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans">
      
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-zinc-800 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-zinc-800/50">
          <div className="flex items-center gap-2.5 text-brand-500">
            <div className="p-1.5 bg-brand-500/10 rounded-lg">
              <LogoIcon className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">SST <span className="text-brand-500">Pro</span></span>
          </div>
          <button 
            className="ml-auto lg:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto scrollbar-hide">
          <p className="px-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Menu</p>
          <div className="space-y-1">
            {isAdmin && (
              <NavItem 
                icon={DashboardIcon} 
                label="Visão Geral" 
                active={location.pathname === '/'}
                onClick={() => handleNavClick('/')}
              />
            )}
            
            <NavItem 
              icon={ShieldCheckIcon} 
              label="Inspeções" 
              active={location.pathname === '/inspections'}
              onClick={() => handleNavClick('/inspections')}
            />

            <NavItem 
              icon={CalendarIcon} 
              label="Agendamentos" 
              active={location.pathname === '/schedule'}
              onClick={() => handleNavClick('/schedule')}
            />
          </div>
          
          {isAdmin && (
            <>
              <p className="px-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest mt-8 mb-3">Gestão</p>
              <div className="space-y-1">
                <NavItem icon={FileTextIcon} label="Relatórios" />
              </div>
            </>
          )}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-zinc-800/50 bg-zinc-900">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-brand-900/20">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-zinc-500 truncate">{user?.company}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors border border-transparent hover:border-red-900/30"
          >
            <LogOutIcon className="w-4 h-4" />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-950">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <LogoIcon className="w-6 h-6 text-brand-500" />
            <span className="font-bold text-white">SST Pro</span>
          </div>
          <button 
            className="p-2 -mr-2 text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 animate-fade-in scroll-smooth">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;