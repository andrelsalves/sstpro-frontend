import { User } from '../types';

// Simulating API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (email: string, password: string): Promise<User> => {
  await delay(800); // Simulate network request

  if (email && password) {
    // Determine role based on email for demo purposes
    const isAdmin = email.toLowerCase().includes('admin');
    
    return {
      id: isAdmin ? '1' : '2',
      name: isAdmin ? 'Admin SST' : 'Indústria Metalúrgica',
      email: email,
      role: isAdmin ? 'admin' : 'user',
      company: isAdmin ? 'SST Pro Gestão' : 'Metalúrgica Aço Forte'
    };
  }
  
  throw new Error('Credenciais inválidas');
};

export const logout = async (): Promise<void> => {
  await delay(500);
};