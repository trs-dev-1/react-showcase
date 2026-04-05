import { useEffect } from 'react';
import { ToastPayload, useToast } from '../hooks/utils/use-toast';
import { toastEmitter } from '../services/toaster-emitter';

export const ToastListener = () => {
  const { toast } = useToast();

  useEffect(() => {
    toastEmitter.subscribe((payload: ToastPayload) => {
      toast(payload);
    });
  }, [toast]);

  return null;
};
