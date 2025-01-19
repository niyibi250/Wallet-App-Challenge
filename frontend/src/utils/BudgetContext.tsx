import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define the shape of a budget object
interface Budget {
  _id: string;
  userId: string;
  categoryName: string;
  amount: number;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Define the context type
interface BudgetContextType {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
  fetchBudgets: () => void;
}

// Define user interface
interface User {
  id: string;
  name: string;
  email: string;
}

// Create the context with default values
const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

// Define the type for the props of BudgetProvider
interface BudgetProviderProps {
  children: React.ReactNode; // Define children prop type
}

// BudgetProvider component to provide context to children
export const BudgetProvider: React.FC<BudgetProviderProps> = ({ children }) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch budgets from the API
  const fetchBudgets = async () => {
    setLoading(true);
    setError(null);
    // const url = 'http://localhost:3000/api'
    const url = 'https://wallet-app-challenge-backend.onrender.com/api'
    try {
      const user: User = localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user') || '{}') 
        : { id: '', name: '', email: '' };
      const userId = user.id;
      const response = await axios.get(`${url}/budgets`, { params: { userId } });
      setBudgets(response.data);
    } catch (err) {
      setError('Failed to fetch budgets');
    } finally {
      setLoading(false);
    }
  };

  // Fetch budgets when the provider is mounted
  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <BudgetContext.Provider value={{ budgets, loading, error, fetchBudgets }}>
      {children}
    </BudgetContext.Provider>
  );
};

// Custom hook to access the budget context
export const useBudgets = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudgets must be used within a BudgetProvider');
  }
  return context;
};
