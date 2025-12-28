import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircleIcon, AlertTriangleIcon, XIcon } from '../components/Icons';

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
}

interface NotificationContextType {
  notify: (notification: Omit<Notification, 'id'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications((prev) => [...prev, newNotification]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[100] space-y-3 w-full max-w-sm pointer-events-none">
        {notifications.map((n) => (
          <div 
            key={n.id}
            className={`
              pointer-events-auto flex items-start p-4 rounded-xl shadow-2xl backdrop-blur-md border animate-slide-in-right
              ${n.type === 'success' ? 'bg-zinc-900/90 border-brand-500/50' : ''}
              ${n.type === 'warning' ? 'bg-zinc-900/90 border-yellow-500/50' : ''}
              ${n.type === 'info' ? 'bg-zinc-900/90 border-blue-500/50' : ''}
            `}
          >
            <div className="shrink-0 mr-3 mt-0.5">
              {n.type === 'success' && <CheckCircleIcon className="w-5 h-5 text-brand-500" />}
              {n.type === 'warning' && <AlertTriangleIcon className="w-5 h-5 text-yellow-500" />}
              {n.type === 'info' && (
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">{n.title}</h4>
              <p className="text-sm text-zinc-400 mt-1">{n.message}</p>
            </div>
            <button 
              onClick={() => removeNotification(n.id)}
              className="shrink-0 ml-3 text-zinc-500 hover:text-white transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};