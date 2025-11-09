# Offline Functionality Implementation

This document describes the offline functionality implemented for the POS system.

## Overview

The POS system now supports offline operation with the following capabilities:
1. Service worker for caching static assets
2. Local storage for transactions when offline
3. Automatic synchronization when connectivity is restored
4. Visual indicators for offline status

## Components

### 1. Service Worker (`public/sw.js`)

The service worker provides basic caching for static assets and implements a network-first strategy for API requests:

- Caches core application files
- Implements network-first strategy for Supabase API requests
- Uses cache-first strategy for static assets
- Provides fallback page for HTML requests when offline

### 2. Offline Service (`src/services/offlineService.ts`)

Handles local data storage and synchronization:

- Stores transactions, customers, and products in localStorage when offline
- Manages queues for pending items
- Synchronizes data when connectivity is restored
- Tracks last sync timestamp

### 3. Offline Hook (`src/hooks/useOffline.ts`)

React hook for managing offline status:

- Tracks online/offline status
- Manages synchronization state
- Provides functions for saving data offline
- Automatically syncs when connectivity is restored

### 4. Offline Context (`src/contexts/OfflineContext.tsx`)

Provides offline status throughout the application:

- Makes offline status available to all components
- Exposes functions for saving data offline
- Handles synchronization

### 5. Offline Indicator (`src/components/OfflineIndicator.tsx`)

Visual indicator for offline status:

- Shows when device is offline
- Displays pending items count
- Allows manual synchronization
- Provides visual feedback during sync

## Implementation Details

### Service Worker Registration

The service worker is registered in `src/main.tsx` during application startup.

### Data Storage

When offline, the system stores data in localStorage:
- Transactions: `pos_transaction_queue`
- Customers: `pos_customer_queue`
- Products: `pos_product_queue`

### Synchronization

When connectivity is restored:
1. The system automatically detects the online status
2. Pending items are synchronized with the server
3. Local storage queues are cleared after successful sync
4. Users are notified of synchronization results

### Integration with Sales Cart

The Sales Cart component (`src/pages/SalesCart.tsx`) has been updated to:
1. Check online status before processing transactions
2. Save transactions locally when offline
3. Display appropriate messages for offline transactions
4. Continue normal operation when online

## Usage

### Automatic Operation

The offline functionality works automatically:
- Service worker is registered on app startup
- Online/offline status is detected automatically
- Data is saved locally when offline
- Synchronization happens automatically when online

### Manual Sync

Users can manually trigger synchronization:
- Click the "Sync Now" button in the offline indicator
- This is useful when automatic sync doesn't occur

## Limitations

1. **Data Conflicts**: The current implementation doesn't handle conflicts between local and remote data
2. **Storage Limits**: localStorage has size limitations
3. **Browser Support**: Requires modern browser support for service workers
4. **Security**: Sensitive data should not be stored in localStorage

## Future Improvements

1. **Conflict Resolution**: Implement conflict resolution for data synchronization
2. **IndexedDB**: Use IndexedDB instead of localStorage for better performance and larger storage
3. **Progressive Enhancement**: Enhance offline capabilities for more application features
4. **Background Sync**: Implement background synchronization using Background Sync API