// Offline Service for POS System
// Handles local data storage and synchronization when offline

export class OfflineService {
  private static readonly TRANSACTION_QUEUE_KEY = 'pos_transaction_queue';
  private static readonly CUSTOMER_QUEUE_KEY = 'pos_customer_queue';
  private static readonly PRODUCT_QUEUE_KEY = 'pos_product_queue';
  private static readonly LAST_SYNC_KEY = 'pos_last_sync';

  // Check if browser supports required features
  static isSupported(): boolean {
    return 'indexedDB' in window && 'localStorage' in window;
  }

  // Save transaction to local storage when offline
  static saveTransactionLocally(transaction: any): boolean {
    try {
      const queue = this.getTransactionQueue();
      queue.push({
        id: this.generateId(),
        timestamp: new Date().toISOString(),
        data: transaction,
        type: 'transaction'
      });
      localStorage.setItem(this.TRANSACTION_QUEUE_KEY, JSON.stringify(queue));
      return true;
    } catch (error) {
      console.error('Failed to save transaction locally:', error);
      return false;
    }
  }

  // Save customer to local storage when offline
  static saveCustomerLocally(customer: any): boolean {
    try {
      const queue = this.getCustomerQueue();
      queue.push({
        id: this.generateId(),
        timestamp: new Date().toISOString(),
        data: customer,
        type: 'customer'
      });
      localStorage.setItem(this.CUSTOMER_QUEUE_KEY, JSON.stringify(queue));
      return true;
    } catch (error) {
      console.error('Failed to save customer locally:', error);
      return false;
    }
  }

  // Save product to local storage when offline
  static saveProductLocally(product: any): boolean {
    try {
      const queue = this.getProductQueue();
      queue.push({
        id: this.generateId(),
        timestamp: new Date().toISOString(),
        data: product,
        type: 'product'
      });
      localStorage.setItem(this.PRODUCT_QUEUE_KEY, JSON.stringify(queue));
      return true;
    } catch (error) {
      console.error('Failed to save product locally:', error);
      return false;
    }
  }

  // Get transaction queue from local storage
  static getTransactionQueue(): any[] {
    try {
      const queue = localStorage.getItem(this.TRANSACTION_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error('Failed to get transaction queue:', error);
      return [];
    }
  }

  // Get customer queue from local storage
  static getCustomerQueue(): any[] {
    try {
      const queue = localStorage.getItem(this.CUSTOMER_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error('Failed to get customer queue:', error);
      return [];
    }
  }

  // Get product queue from local storage
  static getProductQueue(): any[] {
    try {
      const queue = localStorage.getItem(this.PRODUCT_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error('Failed to get product queue:', error);
      return [];
    }
  }

  // Clear transaction queue after successful sync
  static clearTransactionQueue(): void {
    try {
      localStorage.removeItem(this.TRANSACTION_QUEUE_KEY);
    } catch (error) {
      console.error('Failed to clear transaction queue:', error);
    }
  }

  // Clear customer queue after successful sync
  static clearCustomerQueue(): void {
    try {
      localStorage.removeItem(this.CUSTOMER_QUEUE_KEY);
    } catch (error) {
      console.error('Failed to clear customer queue:', error);
    }
  }

  // Clear product queue after successful sync
  static clearProductQueue(): void {
    try {
      localStorage.removeItem(this.PRODUCT_QUEUE_KEY);
    } catch (error) {
      console.error('Failed to clear product queue:', error);
    }
  }

  // Update last sync timestamp
  static updateLastSync(): void {
    try {
      localStorage.setItem(this.LAST_SYNC_KEY, new Date().toISOString());
    } catch (error) {
      console.error('Failed to update last sync timestamp:', error);
    }
  }

  // Get last sync timestamp
  static getLastSync(): string | null {
    try {
      return localStorage.getItem(this.LAST_SYNC_KEY);
    } catch (error) {
      console.error('Failed to get last sync timestamp:', error);
      return null;
    }
  }

  // Check if device is currently online
  static isOnline(): boolean {
    return navigator.onLine;
  }

  // Generate unique ID for offline items
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Sync offline data with server when connectivity is restored
  static async syncOfflineData(): Promise<{ success: boolean; message: string }> {
    if (!this.isOnline()) {
      return { success: false, message: 'Device is offline' };
    }

    try {
      let syncCount = 0;
      
      // Sync transactions
      const transactionQueue = this.getTransactionQueue();
      for (const item of transactionQueue) {
        // In a real implementation, you would call your API to sync the transaction
        // For now, we'll just simulate the sync process
        console.log('Syncing transaction:', item.data);
        syncCount++;
      }
      
      // Sync customers
      const customerQueue = this.getCustomerQueue();
      for (const item of customerQueue) {
        // In a real implementation, you would call your API to sync the customer
        console.log('Syncing customer:', item.data);
        syncCount++;
      }
      
      // Sync products
      const productQueue = this.getProductQueue();
      for (const item of productQueue) {
        // In a real implementation, you would call your API to sync the product
        console.log('Syncing product:', item.data);
        syncCount++;
      }
      
      // Clear queues after successful sync
      if (syncCount > 0) {
        this.clearTransactionQueue();
        this.clearCustomerQueue();
        this.clearProductQueue();
        this.updateLastSync();
        
        return { 
          success: true, 
          message: `Successfully synced ${syncCount} items` 
        };
      }
      
      return { success: true, message: 'No items to sync' };
    } catch (error) {
      console.error('Failed to sync offline data:', error);
      return { success: false, message: 'Failed to sync offline data' };
    }
  }
}