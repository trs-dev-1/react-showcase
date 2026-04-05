import { RedirectDataAfterAuth } from '@/shared/hooks/storage/use-local-storage';

export type AuthModalData = {
  redirectData?: RedirectDataAfterAuth | 'current_path';
};
