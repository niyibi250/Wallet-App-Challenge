import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the Account type
interface Account {
  userid: string;
  accountName: string;
  accountNumber: string;
  accountType: 'Bank' | 'Cash' | 'MobileMoney';
  accountBalance: number;
}

interface AccountContextType {
  account: Account | null;
  loading: boolean;
  error: string | null;
  fetchAccount: () => void;
}

// Define the type for children prop
interface AccountProviderProps {
  children: ReactNode;
}

// Create the Account context
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Provider component
export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch account data
  const fetchAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : { userid: '' };
      const userId = user.userid;

      const response = await axios.get(`http://localhost:3000/api/accounts/${userId}`);
      setAccount(response.data);
    } catch (err) {
      setError('Failed to fetch account data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch the account data when the provider mounts
  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <AccountContext.Provider value={{ account, loading, error, fetchAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the Account context
export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
