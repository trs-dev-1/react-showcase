import { useNetwork } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { toast as sonnerToast } from 'sonner';
import { useToast } from './use-toast';

export const useNetworkStatusNotifier = () => {
  const { toast } = useToast();
  const { online } = useNetwork();
  const offlineToastId = useRef<string | number | null>(null);
  const wasOffline = useRef(false);

  useEffect(() => {
    if (!online && !offlineToastId.current) {
      offlineToastId.current = toast({
        title: 'you-are-offline',
        message: 'some-features-may-be-unavailable',
        duration: Infinity,
        type: 'error'
      });
      wasOffline.current = true;
    } else if (online && offlineToastId.current) {
      sonnerToast.dismiss(offlineToastId.current);
      offlineToastId.current = null;

      if (wasOffline.current) {
        toast({
          title: 'you-are-back',
          message: 'connection-restored',
          type: 'success'
        });
        wasOffline.current = false;
      }
    }
  }, [online, toast]);
  return null;
};
