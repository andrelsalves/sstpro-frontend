import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { LogoIcon } from '../components/Icons';

interface LoginProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  isLoading: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await onLogin(email, password);
    } catch (err) {
      setError('E-mail ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-brand-800/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 shadow-2xl shadow-brand-900/10">
            <LogoIcon className="h-10 w-10 text-brand-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            SST Pro
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Gestão integrada de Segurança e Saúde Ocupacional
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              label="E-mail corporativo"
              placeholder="cliente@empresa.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />

            <div>
              <Input
                id="password"
                type="password"
                label="Senha"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <div className="flex items-center justify-end mt-2">
                <button type="button" className="text-xs font-medium text-brand-500 hover:text-brand-400 transition-colors">
                  Esqueceu a senha?
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-900/20 border border-red-900/50 text-red-200 text-sm flex items-center gap-2">
                 <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 {error}
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              variant="primary"
            >
              Entrar na plataforma
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
             <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800 text-xs text-zinc-500">
              <p className="font-semibold mb-1 text-zinc-400">Ambiente de Demonstração:</p>
              <p>Use <span className="text-brand-400">admin@sst.pro</span> para visão completa</p>
              <p>Use <span className="text-blue-400">cliente@empresa.com</span> para visão empresa</p>
            </div>
            <p className="text-xs text-zinc-600">
              Protegido por criptografia de ponta a ponta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;