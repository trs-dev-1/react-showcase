import { useAuthState, UserDto } from '@/domains/auth';
import { Spinner } from '@/shared/components/ui/spinner';
import { useLocalStorage } from '@/shared/hooks/storage/use-local-storage';
import { useToast } from '@/shared/hooks/utils/use-toast';
import { markAccessTokenAsRefreshed } from '@/shared/services/refresh-token.service';
import { mapUserDtoToDef } from '@/shared/utils/mappers.utils';
import {
  createLazyFileRoute,
  useNavigate,
  useSearch
} from '@tanstack/react-router';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/oauth/(success)/success')({
  component: RouteComponent
});

function RouteComponent() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { jwtUser } = useSearch({ from: '/oauth/(success)/success' });
  const { setUser } = useAuthState();
  const { toast } = useToast();
  const [redirectData, setRedirectData] = useLocalStorage({
    key: 'redirect_data_after_auth',
    defaultValue: null,
    getInitialValueInEffect: false
  });

  useEffect(() => {
    if (jwtUser) {
      try {
        const data = jwtDecode(jwtUser as string) as { user: UserDto };
        const user = mapUserDtoToDef(data.user);

        markAccessTokenAsRefreshed();
        setUser(user);
        toast({
          type: 'success',
          message: 'you-have-been-logged-in'
        });

        if (redirectData) {
          setRedirectData(null);

          // NEED time to see the setUser propagate to navigation context
          setTimeout(() =>
            navigate({
              to: redirectData.to,
              search: redirectData.search,
              replace: true
            })
          );
        }
      } catch {}
    } else {
      navigate({ to: '/' });
    }
  }, [jwtUser]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="font-medium">{t('please-wait')}...</h1>
      <Spinner />
    </div>
  );
}
