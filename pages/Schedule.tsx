import React, { useState, useMemo } from 'react';
import { 
  CalendarIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ClockIcon,
  CheckCircleIcon
} from '../components/Icons';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, fullDate: null });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ 
        day: i, 
        fullDate: new Date(year, month, i)
      });
    }

    return days;
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (date < today) return;
    
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      notify({
        type: 'success',
        title: 'Agendamento Confirmado',
        message: `Vistoria marcada para ${selectedDate.toLocaleDateString('pt-BR')} às ${selectedTime}.`
      });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in py-12">
        <div className="w-24 h-24 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-full flex items-center justify-center text-white mb-8 shadow-2xl shadow-brand-500/20 animate-fade-in">
          <CheckCircleIcon className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Agendamento Confirmado!</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 max-w-sm w-full mx-auto">
          <p className="text-zinc-400 text-sm mb-1 uppercase tracking-wide font-semibold">Detalhes</p>
          <p className="text-white text-lg font-medium">
             {selectedDate?.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <p className="text-brand-400 text-xl font-bold mt-1">{selectedTime}</p>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            Ir para Dashboard
          </Button>
          <Button onClick={() => {
            setIsSuccess(false);
            setSelectedDate(null);
            setSelectedTime(null);
          }}>
            Novo Agendamento
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Agendar Visita Técnica</h1>
        <p className="text-zinc-400 mt-1">Selecione uma data disponível para realizar a inspeção.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Section */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="capitalize">{monthNames[currentDate.getMonth()]}</span> 
              <span className="text-zinc-500 font-normal">{currentDate.getFullYear()}</span>
            </h3>
            <div className="flex gap-1 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
              <button onClick={handlePrevMonth} className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button onClick={handleNextMonth} className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 mb-4">
            {daysOfWeek.map((day, i) => (
              <div key={i} className="text-center text-xs font-semibold text-zinc-500 uppercase tracking-wider py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {calendarDays.map((item, index) => {
              if (!item.day) return <div key={index} className="aspect-square" />;

              const isSelected = selectedDate?.toDateString() === item.fullDate?.toDateString();
              const isToday = new Date().toDateString() === item.fullDate?.toDateString();
              const isPast = item.fullDate && item.fullDate < new Date(new Date().setHours(0,0,0,0));

              return (
                <button
                  key={index}
                  disabled={isPast || false}
                  onClick={() => item.fullDate && handleDateClick(item.fullDate)}
                  className={`
                    aspect-square rounded-full flex flex-col items-center justify-center relative transition-all duration-200
                    ${isSelected 
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-900/50' 
                      : isPast
                        ? 'text-zinc-700 cursor-not-allowed'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }
                    ${isToday && !isSelected ? 'text-brand-500 font-semibold ring-1 ring-brand-500/30' : ''}
                  `}
                >
                  <span className="text-sm">{item.day}</span>
                  {isSelected && <span className="w-1 h-1 bg-white rounded-full absolute bottom-2"></span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots & Confirmation */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-sm flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-brand-500" />
              Horários
            </h3>

            {!selectedDate ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-zinc-500 border-2 border-dashed border-zinc-800/50 rounded-xl bg-zinc-950/50">
                <CalendarIcon className="w-10 h-10 mb-3 text-zinc-700" />
                <p className="text-sm">Selecione uma data no calendário ao lado.</p>
              </div>
            ) : (
              <div className="flex-1 animate-fade-in">
                <p className="text-sm text-zinc-400 mb-4 pb-4 border-b border-zinc-800">
                  Disponibilidade para <strong className="text-white">{selectedDate.toLocaleDateString('pt-BR')}</strong>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-2.5 px-3 rounded-lg text-sm font-medium border transition-all
                        ${selectedTime === time 
                          ? 'bg-brand-500 text-white border-brand-500 shadow-md ring-2 ring-brand-500/20' 
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <div className="flex justify-between items-center mb-6 text-sm">
                <span className="text-zinc-500">Valor Estimado</span>
                <span className="font-semibold text-white">R$ 450,00</span>
              </div>
              <Button 
                fullWidth 
                disabled={!selectedDate || !selectedTime}
                isLoading={isLoading}
                onClick={handleConfirm}
                className="h-12 text-base"
              >
                Confirmar Agendamento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;