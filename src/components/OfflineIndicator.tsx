import React from 'react';
import { useOfflineContext } from '@/contexts/OfflineContext';
import { Wifi, WifiOff, RotateCw, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, isSyncing, syncMessage, pendingItems, syncOfflineData } = useOfflineContext();

  if (isOnline && pendingItems === 0 && !isSyncing) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background border rounded-lg shadow-lg p-3 flex items-center gap-2">
        {!isOnline ? (
          <>
            <WifiOff className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive">Offline</span>
          </>
        ) : isSyncing ? (
          <>
            <RotateCw className="h-4 w-4 animate-spin text-blue-500" />
            <span className="text-sm text-blue-500">{syncMessage}</span>
          </>
        ) : pendingItems > 0 ? (
          <>
            <CheckCircle className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-yellow-500">
              {pendingItems} pending item{pendingItems !== 1 ? 's' : ''} to sync
            </span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={syncOfflineData}
              className="h-6 px-2 text-xs"
            >
              Sync Now
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};