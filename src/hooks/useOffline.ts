// Custom hook for managing offline status and synchronization
import { useState, useEffect } from 'react';
import { OfflineService } from '@/services/offlineService';

export const useOffline = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [pendingItems, setPendingItems] = useState<number>(0);

  // Check initial online status
  useEffect(() => {
    setIsOnline(OfflineService.isOnline());
    updatePendingItemsCount();
    
    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update pending items count
  const updatePendingItemsCount = () => {
    const transactionCount = OfflineService.getTransactionQueue().length;
    const customerCount = OfflineService.getCustomerQueue().length;
    const productCount = OfflineService.getProductQueue().length;
    setPendingItems(transactionCount + customerCount + productCount);
  };

  // Sync offline data with server
  const syncOfflineData = async () => {
    if (!OfflineService.isOnline()) {
      return;
    }
    
    setIsSyncing(true);
    setSyncMessage('Syncing offline data...');
    
    try {
      const result = await OfflineService.syncOfflineData();
      setSyncMessage(result.message);
      
      // Update pending items count after sync
      setTimeout(() => {
        updatePendingItemsCount();
        setIsSyncing(false);
        setSyncMessage('');
      }, 2000);
    } catch (error) {
      setSyncMessage('Failed to sync offline data');
      setIsSyncing(false);
      console.error('Sync error:', error);
    }
  };

  // Save transaction for offline use
  const saveTransactionOffline = (transaction: any) => {
    const success = OfflineService.saveTransactionLocally(transaction);
    if (success) {
      updatePendingItemsCount();
    }
    return success;
  };

  // Save customer for offline use
  const saveCustomerOffline = (customer: any) => {
    const success = OfflineService.saveCustomerLocally(customer);
    if (success) {
      updatePendingItemsCount();
    }
    return success;
  };

  // Save product for offline use
  const saveProductOffline = (product: any) => {
    const success = OfflineService.saveProductLocally(product);
    if (success) {
      updatePendingItemsCount();
    }
    return success;
  };

  return {
    isOnline,
    isSyncing,
    syncMessage,
    pendingItems,
    saveTransactionOffline,
    saveCustomerOffline,
    saveProductOffline,
    syncOfflineData
  };
};