import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface BasketItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  basket: BasketItem[];
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export interface SelectedImage {
  path: string;
  localIdentifier?: string;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const addToBasket = useCallback((product: Product) => {
    setBasket((prev) => [...prev, { product, quantity: 1 }]);
  }, []);



  const getTotalPrice = useCallback(() => {
    return basket.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [basket]);

  const getTotalItems = useCallback(() => {
    return basket.reduce((total, item) => total + item.quantity, 0);
  }, [basket]);


  const value: AppContextType = useMemo(() => ({
    basket,
    getTotalPrice,
    getTotalItems,
    addToBasket,
  }), [basket, getTotalPrice, getTotalItems]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 