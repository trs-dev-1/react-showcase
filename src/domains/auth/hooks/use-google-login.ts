import { environment } from '@/environment';
import { ENDPOINTS } from '@/shared/constants/endpoints.constants';
import {
  RedirectDataAfterAuth,
  useLocalStorage
} from '@/shared/hooks/storage/use-local-storage';
import { useRouter, useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';
import { AuthModalData } from '../interfaces/auth-modal.interfaces';

export const useGoogleLogin = () => {
  const router = useRouter();
  const search = useSearch({ from: '__root__' });
  const [, setRedirectAfterAuth] = useLocalStorage({
    key: 'redirect_data_after_auth',
    defaultValue: null
  });

  return useCallback(
    (redirectData: AuthModalData['redirectData']) => {
      if (redirectData) {
        const payload =
          redirectData === 'current_path'
            ? ({
                to: router.state.location.pathname as never,
                search
              } satisfies RedirectDataAfterAuth)
            : redirectData;

        setRedirectAfterAuth(payload);
      }

      window.location.href = `${environment.apiURL}/${ENDPOINTS.AUTH.USER_GOOGLE_LOGIN}`;
    },
    [setRedirectAfterAuth, router, search]
  );
};
