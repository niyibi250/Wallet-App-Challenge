import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define the shape of the category
interface Category {
  _id: string;
  categoryName: string;
  subcategories: string[];
}

interface user {
  id: string;
  name: string;
  email: string;
}
// Define the context type
interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => void;
}

// Create the context with default values
const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

// Define the type for the props of CategoriesProvider
interface CategoriesProviderProps {
  children: React.ReactNode; // Define children prop type
}

// CategoriesProvider component to provide context to children
export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from the API
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    // const url = 'http://localhost:3000/api'
    const url = 'https://wallet-app-challenge-backend.onrender.com/api'
    try {
      const user: user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : { id: '', name: '', email: '' };
      const userId = user.id;
      const response = await axios.get(`${url}/categories/getcategories`,{params: { userId }});
      setCategories(response.data.categories);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories when the provider is mounted
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error, fetchCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

// Custom hook to access the categories context
export const useCategories = (): CategoriesContextType => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
