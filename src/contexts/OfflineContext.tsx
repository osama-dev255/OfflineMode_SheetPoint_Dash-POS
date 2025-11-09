// Offline Context for POS System
import React, { createContext, useContext, ReactNode } from 'react';
import { useOffline } from '@/hooks/useOffline';

interface OfflineContextType {
  isOnline: boolean;
  isSyncing: boolean;
  syncMessage: string;
  pendingItems: number;
  saveTransactionOffline: (transaction: any) => boolean;
  saveCustomerOffline: (customer: any) => boolean;
  saveProductOffline: (product: any) => boolean;
  syncOfflineData: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const offline = useOffline();
  
  return (
    <OfflineContext.Provider value={offline}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOfflineContext = (): OfflineContextType => {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOfflineContext must be used within an OfflineProvider');
  }
  return context;
};