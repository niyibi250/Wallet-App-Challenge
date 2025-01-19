import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define the shape of a transaction using the provided interface
interface TransactionValues {
  userId: string;
  accountName: string;
  type: string;
  amount: string;
  categoryName: string;
  description: string;
  date: Date | null;
}

// Define the context type
interface TransactionsContextType {
  transactions: TransactionValues[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => void;
}

interface user {
  id: string;
  name: string;
  email: string;
}
// Create the context with default values
const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

// Define the type for the props of TransactionsProvider
interface TransactionsProviderProps {
  children: React.ReactNode; // Define children prop type
}

// TransactionsProvider component to provide context to children
export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<TransactionValues[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions from the API
  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    // const url = 'http://localhost:3000/api'
    const url = 'https://wallet-app-challenge-backend.onrender.com/api'
    try {
      const user: user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : { id: '', name: '', email: '' };
      const userId = user.id;
      const response = await axios.get(`${url}/transactions/`, {params: { userId }});
      setTransactions(response.data.transactions);
    } catch (err) {
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions when the provider is mounted
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, loading, error, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

// Custom hook to access the transactions context
export const useTransactions = (): TransactionsContextType => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};
