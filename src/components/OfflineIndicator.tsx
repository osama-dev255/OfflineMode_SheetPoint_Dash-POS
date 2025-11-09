import React from 'react';
import { useOfflineContext } from '@/contexts/OfflineContext';
import { Wifi, WifiOff, RotateCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, isSyncing, syncMessage, pendingItems, syncOfflineData } = useOfflineContext();

  if (isOnline && pendingItems === 0 && !isSyncing) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background border rounded-lg shadow-lg p-3 flex items-center gap-2 max-w-xs">
        {!isOnline ? (
          <>
            <WifiOff className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive">Offline Mode</span>
            <Badge variant="destructive" className="ml-2">Limited Features</Badge>
          </>
        ) : isSyncing ? (
          <>
            <RotateCw className="h-4 w-4 animate-spin text-blue-500" />
            <span className="text-sm text-blue-500">{syncMessage || 'Syncing data...'}</span>
          </>
        ) : pendingItems > 0 ? (
          <>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
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
        ) : (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-500">Online & Ready</span>
          </>
        )}
      </div>
    </div>
  );
};