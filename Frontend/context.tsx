
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from './types';
import { MOCK_USERS } from './data';

interface AppContextType {
  user: User | null;
  login: (email: string, role: UserRole, isSignup?: boolean) => Promise<boolean>;
  logout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  notifications: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications] = useState(3);

  // Initialize theme from system preference or local storage logic could go here
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const login = async (email: string, role: UserRole, isSignup: boolean = false) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (isSignup && role !== 'ADMIN') {
            // Simulate a new unverified user
            setUser({
                id: `u${Date.now()}`,
                name: 'New User',
                email: email,
                role: role,
                avatar: 'https://i.pravatar.cc/150',
                verified: false,
                location: 'Unknown',
            });
        } else {
            // Simulate mock login
            const foundUser = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
            setUser({...foundUser, role}); // Force role for demo purposes
        }
        resolve(true);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{ user, login, logout, theme, toggleTheme, notifications }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
